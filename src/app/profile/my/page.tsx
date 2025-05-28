import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import MyProfileClient from "./MyProfileClient";
import { redirect } from "next/navigation";

export default async function MyProfilePage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  const { data: myProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id);

  console.log(myProfile);

  if (!user?.id) {
    redirect("/login");
  }

  return (
    <div style={{ paddingTop: 16 }}>
      <MyProfileClient user={myProfile || []} />
    </div>
  );
} 