"use client";

import TabNavigation from "./navigation";

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-0">
      <TabNavigation />
      <div className="tab-content">
        {children}
      </div>
    </div>
  );
}
