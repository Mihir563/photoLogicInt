"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabNavigation() {
  const pathname = usePathname();
  
  // Get the current active tab from URL
  const getCurrentTab = () => {
    const segments = pathname.split("/");
    const lastSegment = segments[segments.length - 1];

    // If on base client dashboard URL, default to "bookings"
    if (lastSegment === "client") return "bookings";

    // Check if the last segment is one of our valid tabs
    const validTabs = ["bookings", "messages", "profile"];
    if (validTabs.includes(lastSegment)) return lastSegment;

    return "bookings";
  };

  return (
    <div className="border-b">
      <Tabs defaultValue={getCurrentTab()}>
        <TabsList className="w-full grid grid-cols-3 bg-transparent">
          <Link href="/dashboard/client/bookings" passHref className="w-full">
            <TabsTrigger
              value="bookings"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none w-full"
            >
              My Bookings
            </TabsTrigger>
          </Link>
          <Link href="/dashboard/client/messages" passHref className="w-full">
            <TabsTrigger
              value="messages"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none w-full"
            >
              Messages
            </TabsTrigger>
          </Link>
          <Link href="/dashboard/client/profile" passHref className="w-full">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none w-full"
            >
              Profile
            </TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
    </div>
  );
}
