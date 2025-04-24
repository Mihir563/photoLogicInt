"use client";
export const dynamic = 'force-dynamic';

import { Button } from "@/components/ui/button";
import { Camera, CalendarIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function ClientDashboard() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Client Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your bookings and find photographers
          </p>
        </div>
        <Button onClick={() => router.push("/photographers")}>
          Find Photographers
        </Button>
      </div>
      
      {/* Client Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                My Bookings
              </p>
              <h3 className="text-2xl font-bold mt-1">0</h3>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <CalendarIcon className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Favorite Photographers
              </p>
              <h3 className="text-2xl font-bold mt-1">0</h3>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <Camera className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* The tabs content will be rendered by the parallel routing system */}
    </div>
  );
}
