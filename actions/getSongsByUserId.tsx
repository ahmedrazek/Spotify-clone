import { Song } from "@/types";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

const getSongsByUserId = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getUser();
  if (sessionError) {
    console.log(sessionError);
    return [];
  }
  const { data: songsData, error: songsError } = await supabase
    .from("songs")
    .select("*")
    .eq("user_id", sessionData?.user.id)
    .order("create_at", { ascending: false });
  if (songsError) {
    console.log(songsError);
  }
  return (songsData as any) || [];
};

export default getSongsByUserId;
