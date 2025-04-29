import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("portfolio")
      .select("category");

    if (error) {
      console.error("Error fetching categories:", error);
      return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }

    // Format categories
    const formattedCategories = data.map(item => ({
      slug: item.category.toLowerCase().replace(/\s+/g, "-"),
      name: item.category.charAt(0).toUpperCase() + item.category.slice(1),
    }));

    return NextResponse.json({ categories: formattedCategories });
  } catch (error) {
    console.error("Unexpected error in API:", error);
    return NextResponse.json({ error: "An unexpected error occurred", message: String(error) }, { status: 500 });
  }
}
