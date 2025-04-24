import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export async function GET() {
  // Get all photographers (same logic as /api/search, but without filters)
  const { data, error } = await supabase
    .from("profiles")
    .select(`
      id,
      name,
      avatar_url,
      cover_image,
      location,
      bio,
      specialties,
      hourly_rate,
      rating
    `)
    .eq("account_type", "photographer");

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Error fetching photographers" }, { status: 500 });
  }

  // Format photographer data
  const photographers = (data || []).map((profile: any) => ({
    id: profile.id,
    name: profile.name,
    avatar: profile.avatar_url,
    coverImage: profile.cover_image,
    location: profile.location,
    rating: profile.rating || 0,
    specialties: profile.specialties || [],
    price: profile.hourly_rate || 0,
    bio: profile.bio || "",
  }));

  // Flatten and deduplicate specialties
  const allSpecialties = (data || [])
    .flatMap((profile: any) => profile.specialties || []);
  const uniqueSpecialties = Array.from(new Set(allSpecialties))
    .filter((s) => !!s)
    .map((s) => ({
      slug: s.toLowerCase().replace(/\s+/g, '-'),
      name: s.charAt(0).toUpperCase() + s.slice(1),
    }));

  return NextResponse.json({ categories: uniqueSpecialties, photographers });
}
