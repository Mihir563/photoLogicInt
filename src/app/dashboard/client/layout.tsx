"use client";
export const dynamic = 'force-dynamic';

import { Suspense, useEffect } from "react";
import CosmicLoader from "@/app/loading";
import { useRouter, usePathname } from "next/navigation";

export default function ClientLayout({
  children,
  tabs,
}: {
  children: React.ReactNode;
  tabs: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If we're at the root client dashboard, redirect to the bookings tab
    if (pathname === "/dashboard/client") {
      router.replace("/dashboard/client/bookings");
    }
  }, [pathname, router]);

  return (
    <div className="flex flex-col space-y-4">
      {/* Dashboard header and stats - this is the main content */}
      <Suspense fallback={<CosmicLoader />}>
        {children}
      </Suspense>
      
      {/* Tab navigation and content */}
      <Suspense fallback={<CosmicLoader />}>
        {tabs}
      </Suspense>
    </div>
  );
}
