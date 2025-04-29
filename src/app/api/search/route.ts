import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query") || ""
    const location = searchParams.get("location") || ""
    const category = searchParams.get("category") || ""
    const minPrice = Number.parseInt(searchParams.get("minPrice") || "0")
    const maxPrice = Number.parseInt(searchParams.get("maxPrice") || "100000")
    const specialties = searchParams.get("specialties")?.split(",") || []
    const sortBy = searchParams.get("sortBy") || "rating"

    let supabaseQuery = supabase
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
      .eq("account_type", "photographer")

    // Apply filters
    if (query) {
      supabaseQuery = supabaseQuery.or(`name.ilike.%${query}%,bio.ilike.%${query}%`)
    }

    if (location) {
      supabaseQuery = supabaseQuery.ilike("location", `%${location}%`)
    }

    // Remove .contains() for category to fetch all photographers; filter in JS below
    // if (category) {
    //   supabaseQuery = supabaseQuery.contains("specialties", [category.toLowerCase()]);
    // }

    if (specialties.length > 0) {
      // Lowercase all specialties for matching
      const lowerSpecialties = specialties.map(s => s.toLowerCase());
      // Fetch all, filter in JS for OR logic
      // (Supabase JS client does not support array overlap operator directly)
    }

    supabaseQuery = supabaseQuery.gte("hourly_rate", minPrice).lte("hourly_rate", maxPrice)

    // Apply sorting
    if (sortBy === "rating") {
      supabaseQuery = supabaseQuery.order("rating", { ascending: false })
    } else if (sortBy === "price_low") {
      supabaseQuery = supabaseQuery.order("hourly_rate", { ascending: true })
    } else if (sortBy === "price_high") {
      supabaseQuery = supabaseQuery.order("hourly_rate", { ascending: false })
    } else if (sortBy === "newest") {
      supabaseQuery = supabaseQuery.order("created_at", { ascending: false })
    }

    const { data, error } = await supabaseQuery

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Error searching photographers", details: error.message || error }, { status: 500 })
    }

    // Filter in JS for case-insensitive specialty match if category is provided
    let filtered = data;
    if (category) {
      filtered = data.filter(profile =>
        (profile.specialties || []).some(
          (s: string) => s.toLowerCase() === category.toLowerCase()
        )
      );
    }
    // If specialties are selected, further filter for OR logic (any match)
    if (specialties.length > 0) {
      const lowerSpecialties = specialties.map(s => s.toLowerCase());
      filtered = filtered.filter(profile =>
        (profile.specialties || []).some(
          (s: string) => lowerSpecialties.includes(s.toLowerCase())
        )
      );
    }

    // Format the data
    const photographers = filtered.map((profile) => ({
      id: profile.id,
      name: profile.name,
      avatar: profile.avatar_url,
      coverImage: profile.cover_image,
      location: profile.location,
      rating: profile.rating || 0,
      specialties: profile.specialties || [],
      price: profile.hourly_rate || 0,
      bio: profile.bio || "",
    }))

    return NextResponse.json({ photographers })
  } catch (error) {
    console.error("Error searching photographers:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

