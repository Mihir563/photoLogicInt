"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PhotographerCard from "@/components/photographer-card";
import CosmicLoader from "../../loading";
import type { Photographer } from "@/lib/types";

export default function CategoryPage() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategoryPhotographers() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/search?category=${slug}`);
        if (!res.ok) throw new Error("Failed to fetch photographers");
        const data = await res.json();
        setPhotographers(data.photographers || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchCategoryPhotographers();
  }, [slug]);

  return (
    <div className="max-w-5xl mx-auto py-8 px-2">
      <h1 className="text-3xl font-bold mb-2 capitalize">{slug?.toString().replace(/-/g, ' ')} Photographers</h1>
      <p className="text-muted-foreground mb-6">Browse photographers in this category.</p>
      {loading ? (
        <CosmicLoader />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : photographers.length === 0 ? (
        <div className="text-muted-foreground">No photographers found in this category.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photographers.map((photographer) => (
            <PhotographerCard key={photographer.id} photographer={photographer} />
          ))}
        </div>
      )}
    </div>
  );
}