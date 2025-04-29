"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

// Example static reviews; replace with API call or props as needed
const reviews = [
  {
    id: 1,
    reviewer: "Amit Patel",
    avatar_url: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    date: "2025-04-15",
    text: "Amazing experience! The photographer was professional and made us feel comfortable throughout the shoot.",
  },
  {
    id: 2,
    reviewer: "Priya Sharma",
    avatar_url: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    date: "2025-03-30",
    text: "Great photos and quick delivery. Would definitely recommend PhotoLogic!",
  },
  {
    id: 3,
    reviewer: "Rahul Verma",
    avatar_url: "https://randomuser.me/api/portraits/men/65.jpg",
    rating: 5,
    date: "2025-02-20",
    text: "Booked a photographer for my sister's wedding. The quality was top-notch!",
  },
];

export default function ReviewsPage() {
  // In a real app, fetch reviews from backend here
  // const [reviews, setReviews] = useState([]);
  // useEffect(() => { fetch('/api/reviews').then(...); }, []);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Client Reviews</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <Card key={review.id} className="shadow-md border-2 border-blue-100">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar>
                <AvatarImage src={review.avatar_url} alt={review.reviewer} />
                <AvatarFallback>{review.reviewer[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{review.reviewer}</div>
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                </div>
                <div className="text-xs text-muted-foreground">{review.date}</div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-base text-gray-800">{review.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
