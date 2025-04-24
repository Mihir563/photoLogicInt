'use client';

// Skip static generation entirely for this route
export const dynamic = 'force-dynamic';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export default function ClientBookingsTab() {
  const router = useRouter();
  
  return (
    <Card className="mt-4 border shadow-sm">
      <CardContent className="pt-6">
        <div className="text-center py-12">
          <Camera className="h-16 w-16 mx-auto text-muted-foreground" />
          <h3 className="text-xl font-medium mt-4">No bookings yet</h3>
          <p className="text-muted-foreground mt-2">
            Book a session with a photographer to get started
          </p>
          <Button
            className="mt-4"
            onClick={() => router.push("/photographers")}
          >
            Find Photographers
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
