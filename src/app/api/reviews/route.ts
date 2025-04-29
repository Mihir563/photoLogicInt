import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET: Fetch all reviews
export async function GET(request: Request) {
  try {
    // Optionally filter by photographer_id or client_id via query params
    const { searchParams } = new URL(request.url);
    const photographer_id = searchParams.get("photographer_id");
    const client_id = searchParams.get("client_id");
    let query = supabase.from("reviews").select("*", { count: "exact" });

    if (photographer_id) {
      query = query.eq("photographer_id", photographer_id);
    }
    if (client_id) {
      query = query.eq("client_id", client_id);
    }
    query = query.order("created_at", { ascending: false });

    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ reviews: data });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST: Add a new review
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { booking_id, client_id, photographer_id, rating, comment } = body;
    if (!booking_id || !client_id || !photographer_id || !rating || !comment) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const { data, error } = await supabase.from("reviews").insert([
      {
        booking_id,
        client_id,
        photographer_id,
        rating,
        comment,
      },
    ]).select();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ review: data[0] });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
