"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/supabaseAuth";

export default function AuthPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const fn = isSignUp ? signUp : signIn;
    const { error } = await fn(email, password);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.replace("/"); // 로그인/회원가입 성공 시 메인으로 이동
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#FFF6F5" }}>
      <form onSubmit={handleSubmit} style={{ width: 320, background: "#fff", borderRadius: 20, boxShadow: "0 4px 24px rgba(235,168,166,0.10)", padding: "40px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
        <h2 style={{ color: "#EBA8A6", fontWeight: 700, fontSize: "1.3rem", marginBottom: 8 }}>{isSignUp ? "회원가입" : "로그인"}</h2>
        <input type="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} required style={{ padding: "12px 16px", borderRadius: 12, border: "1.5px solid #EBA8A6", fontSize: "1rem" }} />
        <input type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: "12px 16px", borderRadius: 12, border: "1.5px solid #EBA8A6", fontSize: "1rem" }} />
        {error && <div style={{ color: "#EBA8A6", fontSize: "0.97rem" }}>{error}</div>}
        <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px 0", borderRadius: 16, background: "#EBA8A6", color: "#fff", fontWeight: 700, fontSize: "1.05rem", border: "none", boxShadow: "0 2px 8px rgba(22, 12, 12, 0.10)", cursor: "pointer", letterSpacing: "-1px", marginTop: 8, transition: "background 0.2s" }}>
          {loading ? "처리 중..." : isSignUp ? "회원가입" : "로그인"}
        </button>
        <div style={{ marginTop: 12, color: "#888", fontSize: "0.98rem", textAlign: "center" }}>
          {isSignUp ? (
            <>
              이미 계정이 있으신가요?{" "}
              <span style={{ color: "#EBA8A6", cursor: "pointer", fontWeight: 600 }} onClick={() => setIsSignUp(false)}>
                로그인
              </span>
            </>
          ) : (
            <>
              계정이 없으신가요?{" "}
              <span style={{ color: "#EBA8A6", cursor: "pointer", fontWeight: 600 }} onClick={() => setIsSignUp(true)}>
                회원가입
              </span>
            </>
          )}
        </div>
      </form>
    </div>
  );
} 