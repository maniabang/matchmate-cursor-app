import { supabase } from '@/lib/supabase';

export async function uploadProfileImage(file: File, userId: string): Promise<{ url: string, path: string } | null> {
  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}/${Date.now()}.${fileExt}`;
  const { error } = await supabase.storage.from('profile-images').upload(filePath, file);
  if (error) {
    console.error('이미지 업로드 실패:', error.message);
    return null;
  }
  const { data: urlData } = supabase.storage.from('profile-images').getPublicUrl(filePath);
  return urlData?.publicUrl ? { url: urlData.publicUrl, path: filePath } : null;
}

export async function removeProfileImage(filePath: string) {
  const { error } = await supabase.storage.from('profile-images').remove([filePath]);
  if (error) {
    console.error('이미지 삭제 실패:', error.message);
  }
} 