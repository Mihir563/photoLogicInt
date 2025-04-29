import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = await params;

  try {
    // Lowercase and normalize the slug for matching
    const normalizedCategory = slug.toLowerCase().replace(/-/g, " ");

    // Query photographers whose specialties array contains the category
    const { data, error } = await supabase
      .from("profiles")
      .select("id, name, email, phone, location, bio, specialties, avatar_url, cover_image, account_type, rating, hourly_rate")
      .eq("account_type", "photographer")
      .contains("specialties", [normalizedCategory]);

    if (error) {
      console.error("Error fetching photographers:", error);
      return NextResponse.json({ error: "Failed to fetch photographers" }, { status: 500 });
    }

    return NextResponse.json({ photographers: data });
  } catch (error) {
    console.error("Unexpected error in API:", error);
    return NextResponse.json({ error: "An unexpected error occurred", message: String(error) }, { status: 500 });
  }
}