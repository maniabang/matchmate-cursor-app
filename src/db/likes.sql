-- 1. 기본 likes 테이블 (boolean 방식)
CREATE TABLE likes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    receiver_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    is_accepted boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    accepted_at timestamptz,
    
    -- 중복 방지를 위한 unique constraint
    UNIQUE(sender_id, receiver_id)
);

-- 2. 성능을 위한 인덱스
CREATE INDEX idx_likes_sender ON likes(sender_id);
CREATE INDEX idx_likes_receiver ON likes(receiver_id);
CREATE INDEX idx_likes_accepted ON likes(is_accepted);

-- 3. RPC 함수: 좋아요 보내기
CREATE OR REPLACE FUNCTION send_like(
    p_sender_id uuid,
    p_receiver_id uuid
) RETURNS json AS $$
DECLARE
    existing_like likes%rowtype;
    mutual_like likes%rowtype;
    result json;
BEGIN
    -- 자기 자신에게는 좋아요 불가
    IF p_sender_id = p_receiver_id THEN
        RETURN json_build_object(
            'success', false,
            'message', '자기 자신에게는 좋아요를 보낼 수 없습니다'
        );
    END IF;
    
    -- 이미 좋아요를 보냈는지 확인
    SELECT * INTO existing_like 
    FROM likes 
    WHERE sender_id = p_sender_id AND receiver_id = p_receiver_id;
    
    IF existing_like.id IS NOT NULL THEN
        RETURN json_build_object(
            'success', false,
            'message', '이미 좋아요를 보냈습니다'
        );
    END IF;
    
    -- 좋아요 생성
    INSERT INTO likes (sender_id, receiver_id)
    VALUES (p_sender_id, p_receiver_id);
    
    -- 상대방이 나에게 좋아요를 보냈는지 확인 (상호 좋아요)
    SELECT * INTO mutual_like 
    FROM likes 
    WHERE sender_id = p_receiver_id AND receiver_id = p_sender_id;
    
    IF mutual_like.id IS NOT NULL THEN
        -- 양쪽 모두 수락으로 변경
        UPDATE likes 
        SET is_accepted = true, accepted_at = now() 
        WHERE (sender_id = p_sender_id AND receiver_id = p_receiver_id)
           OR (sender_id = p_receiver_id AND receiver_id = p_sender_id);
           
        RETURN json_build_object(
            'success', true,
            'message', '매칭이 성공했습니다!',
            'matched', true
        );
    ELSE
        RETURN json_build_object(
            'success', true,
            'message', '좋아요를 보냈습니다',
            'matched', false
        );
    END IF;
END;
$$ LANGUAGE plpgsql;

-- 4. RPC 함수: 좋아요 거절하기
CREATE OR REPLACE FUNCTION reject_like(
    p_sender_id uuid,
    p_receiver_id uuid
) RETURNS json AS $$
BEGIN
    DELETE FROM likes 
    WHERE sender_id = p_receiver_id AND receiver_id = p_sender_id;
    
    RETURN json_build_object(
        'success', true,
        'message', '좋아요를 거절했습니다'
    );
END;
$$ LANGUAGE plpgsql;

-- 5. RPC 함수: 내가 받은 좋아요 목록
CREATE OR REPLACE FUNCTION get_received_likes(
    p_user_id uuid
) RETURNS json AS $$
DECLARE
    result json;
BEGIN
    SELECT json_agg(
        json_build_object(
            'id', l.id,
            'sender', json_build_object(
                'id', p.id,
                'name', p.name,
                'avatar_url', p.avatar_url
            ),
            'created_at', l.created_at,
            'is_accepted', l.is_accepted
        )
    ) INTO result
    FROM likes l
    JOIN profiles p ON l.sender_id = p.id
    WHERE l.receiver_id = p_user_id 
    AND l.is_accepted = false;
    
    RETURN COALESCE(result, '[]'::json);
END;
$$ LANGUAGE plpgsql;

-- 6. RPC 함수: 매칭된 사용자 목록
CREATE OR REPLACE FUNCTION get_matches(
    p_user_id uuid
) RETURNS json AS $$
DECLARE
    result json;
BEGIN
    SELECT json_agg(
        json_build_object(
            'id', l.id,
            'matched_user', json_build_object(
                'id', p.id,
                'name', p.name,
                'avatar_url', p.avatar_url
            ),
            'matched_at', l.accepted_at
        )
    ) INTO result
    FROM likes l
    JOIN profiles p ON (
        CASE 
            WHEN l.sender_id = p_user_id THEN l.receiver_id = p.id
            ELSE l.sender_id = p.id
        END
    )
    WHERE (l.sender_id = p_user_id OR l.receiver_id = p_user_id)
    AND l.is_accepted = true;
    
    RETURN COALESCE(result, '[]'::json);
END;
$$ LANGUAGE plpgsql;

-- 7. RPC 함수: 좋아요 상태 확인
CREATE OR REPLACE FUNCTION check_like_status(
    p_user_id uuid,
    p_target_id uuid
) RETURNS json AS $$
DECLARE
    sent_like likes%rowtype;
    received_like likes%rowtype;
BEGIN
    -- 내가 보낸 좋아요
    SELECT * INTO sent_like 
    FROM likes 
    WHERE sender_id = p_user_id AND receiver_id = p_target_id;
    
    -- 상대방이 보낸 좋아요
    SELECT * INTO received_like 
    FROM likes 
    WHERE sender_id = p_target_id AND receiver_id = p_user_id;
    
    RETURN json_build_object(
        'sent_like', sent_like.id IS NOT NULL,
        'received_like', received_like.id IS NOT NULL,
        'matched', (sent_like.is_accepted = true OR received_like.is_accepted = true)
    );
END;
$$ LANGUAGE plpgsql;

-- 8. Row Level Security 설정
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신이 보낸 좋아요나 받은 좋아요만 볼 수 있음
CREATE POLICY "Users can view their own likes" ON likes
    FOR SELECT USING (
        auth.uid() = sender_id OR auth.uid() = receiver_id
    );

-- 사용자는 자신이 보내는 좋아요만 생성할 수 있음
CREATE POLICY "Users can send likes" ON likes
    FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- 사용자는 자신이 받은 좋아요만 업데이트할 수 있음
CREATE POLICY "Users can update received likes" ON likes
    FOR UPDATE USING (auth.uid() = receiver_id);

ALTER TABLE likes ADD COLUMN type text DEFAULT 'like'; -- 'like' 또는 'super_like'

CREATE OR REPLACE FUNCTION check_like_status_v2(
    p_user_id uuid,
    p_target_id uuid
) RETURNS json AS $$
DECLARE
    sent_like likes%rowtype;
    received_like likes%rowtype;
BEGIN
    -- 내가 보낸 좋아요
    SELECT * INTO sent_like 
    FROM likes 
    WHERE sender_id = p_user_id AND receiver_id = p_target_id;

    -- 상대방이 보낸 좋아요
    SELECT * INTO received_like 
    FROM likes 
    WHERE sender_id = p_target_id AND receiver_id = p_user_id;

    RETURN json_build_object(
        'sent_like', sent_like.id IS NOT NULL,
        'sent_like_type', sent_like.type,
        'received_like', received_like.id IS NOT NULL,
        'received_like_type', received_like.type,
        'matched', (
            (sent_like.type = 'super_like' AND received_like.type = 'like') OR
            (sent_like.type = 'like' AND received_like.type = 'super_like')
        )
    );
END;
$$ LANGUAGE plpgsql;