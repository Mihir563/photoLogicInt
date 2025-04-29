"use client";

import { useEffect, useState, Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, CalendarIcon, IndianRupee, Camera } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import BookingManager from "@/components/booking-manager";
import ChatInterface from "@/components/chat-interface";
import PortfolioManager from "@/components/portfolio-manager";
import PricingForm from "@/components/pricing-form";
import AvailabilityManager from "@/components/availability-manager";
import ProfileForm from "@/components/profile-form";
import CosmicLoader from "@/app/loading";

const TABS = ["bookings", "messages", "portfolio", "pricing", "availability", "profile"];

export default function Dashboard() {
  const [userData, setUserData] = useState<{ id: string, account_type: string } | null>(null);

  // Helper to get tab from hash or default
  const getTabFromHash = () => {
    const hash = window.location.hash.replace("#", "");
    return TABS.includes(hash) ? hash : "bookings";
  };

  const [activeTab, setActiveTab] = useState(getTabFromHash);

  // Robustly sync activeTab with hash
  useEffect(() => {
    const onHashChange = () => {
      const tab = getTabFromHash();
      setActiveTab(tab);
    };
    window.addEventListener("hashchange", onHashChange);
    // Sync on mount and if hash changes programmatically
    onHashChange();
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // When tab changes, update the hash only if different
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (window.location.hash.replace("#", "") !== tab) {
      window.location.hash = tab;
    }
  };

  const [stats, setStats] = useState({
    totalBookings: 0,
    newMessages: 0,
    profileViews: 0,
    totalRevenue: 0,
    favoritePhotographers: 0
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      // Get the current authenticated user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Get the user's profile
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileData) {
          setUserData(profileData);

          if (profileData.account_type === "photographer") {
            // Fetch stats for photographer
            const { count: bookingsCount } = await supabase
              .from("bookings")
              .select("*", { count: "exact" })
              .eq("photographer_id", user.id);

            const { count: messagesCount } = await supabase
              .from("messages")
              .select("*", { count: "exact" })
              .eq("receiver_id", user.id)
              .eq("read", false);

            const { data: completedBookings } = await supabase
              .from("bookings")
              .select("*")
              .eq("photographer_id", user.id)
              .eq("status", "completed");

            const { data: pricingPackages } = await supabase
              .from("pricing_packages")
              .select("*")
              .eq("user_id", user.id);

            let revenue = 0;
            if (completedBookings && pricingPackages) {
              revenue =
                completedBookings.length * (pricingPackages[0]?.price || 0);
            }

            setStats({
              totalBookings: bookingsCount || 0,
              newMessages: messagesCount || 0,
              profileViews: profileData.profile_views || 0,
              totalRevenue: revenue,
              favoritePhotographers: 0
            });
          } else {
            // Fetch stats for client
            const { count: bookingsCount } = await supabase
              .from("bookings")
              .select("*", { count: "exact" })
              .eq("client_id", user.id);
              
            // Count favorite photographers
            const { count: favoritesCount } = await supabase
              .from("favorites")
              .select("*", { count: "exact" })
              .eq("user_id", user.id);
              
            setStats({
              totalBookings: bookingsCount || 0,
              newMessages: 0,
              profileViews: 0,
              totalRevenue: 0,
              favoritePhotographers: favoritesCount || 0
            });
          }
        }
      }
    };

    fetchUserData();
  }, []);

  // Render the dashboard based on user type
  const renderDashboard = () => {
    if (!userData) return <CosmicLoader />;
    
    const isPhotographer = userData.account_type === "photographer";
    
    return (
      <>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
             {/* Dynamic header based on active tab */}
            {(() => {
              const tabTitles: Record<string, string> = {
                bookings: "Bookings",
                messages: "Messages",
                portfolio: "Portfolio",
                pricing: "Pricing",
                availability: "Availability",
                profile: "Profile",
              };
              const tabDescriptions: Record<string, string> = {
                bookings: "Manage your photography sessions",
                messages: "Chat with clients or photographers",
                portfolio: "Showcase your best work",
                pricing: "Manage your service packages",
                availability: "Set your available time slots",
                profile: "Manage your personal information",
              };
              const title = tabTitles[activeTab] || (isPhotographer ? "Photographer Dashboard" : "Client Dashboard");
              const desc = tabDescriptions[activeTab] || (isPhotographer
                ? "Manage your profile, bookings, and messages"
                : "Manage your bookings and find photographers");
              return (
                <>
                  <h1 className="text-3xl font-bold">{title}</h1>
                  <p className="text-muted-foreground">{desc}</p>
                </>
              );
            })()}

          </div>
          {isPhotographer ? (
            <Button onClick={() => router.push(`/photographers/${userData?.id}`)}>
              View Public Profile
            </Button>
          ) : (
            <Button onClick={() => router.push("/photographers")}>
              Find Photographers
            </Button>
          )}
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {isPhotographer ? "Total Bookings" : "My Bookings"}
                </p>
                <h3 className="text-2xl font-bold mt-1">{stats.totalBookings}</h3>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <CalendarIcon className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>

          {isPhotographer ? (
            <>
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      New Messages
                    </p>
                    <h3 className="text-2xl font-bold mt-1">{stats.newMessages}</h3>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Profile Views
                    </p>
                    <h3 className="text-2xl font-bold mt-1">{stats.profileViews}</h3>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Revenue
                    </p>
                    <h3 className="text-2xl font-bold mt-1 flex items-center">
                      <IndianRupee className="h-5 w-5" />
                      {stats.totalRevenue.toLocaleString()}
                    </h3>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <IndianRupee className="h-6 w-6 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Favorite Photographers
                  </p>
                  <h3 className="text-2xl font-bold mt-1">{stats.favoritePhotographers}</h3>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Tabs Navigation */}
        <Tabs
          key={activeTab}
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="flex flex-wrap justify-center gap-2 md:justify-start">
            <TabsTrigger
              value="bookings"
              className="flex-1 min-w-[120px]"
            >
              Bookings
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="flex-1 min-w-[120px]"
            >
              Messages
            </TabsTrigger>
            {isPhotographer && (
              <>
                <TabsTrigger
                  value="portfolio"
                  className="flex-1 min-w-[120px]"
                >
                  Portfolio
                </TabsTrigger>
                <TabsTrigger
                  value="pricing"
                  className="flex-1 min-w-[120px]"
                >
                  Pricing
                </TabsTrigger>
                <TabsTrigger
                  value="availability"
                  className="flex-1 min-w-[120px]"
                >
                  Availability
                </TabsTrigger>
              </>
            )}
            <TabsTrigger
              value="profile"
              className="flex-1 min-w-[120px]"
            >
              Profile
            </TabsTrigger>
          </TabsList>
          
          {/* Tab Content */}
          <TabsContent value="bookings" className="mt-6">
            <Suspense fallback={<CosmicLoader />}>
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Bookings</CardTitle>
                  <CardDescription>Manage your photography sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <BookingManager userId={userData.id} />
                </CardContent>
              </Card>
            </Suspense>
          </TabsContent>
          
          <TabsContent value="messages" className="mt-6">
            <Suspense fallback={<CosmicLoader />}>
              <div className="mt-4">
                <ChatInterface userId={userData.id} userType={userData.account_type} />
              </div>
            </Suspense>
          </TabsContent>
          
          {isPhotographer && (
            <>
              <TabsContent value="portfolio" className="mt-6">
                <Suspense fallback={<CosmicLoader />}>
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle>Portfolio</CardTitle>
                      <CardDescription>Showcase your best work</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <PortfolioManager userId={userData.id} />
                    </CardContent>
                  </Card>
                </Suspense>
              </TabsContent>
              
              <TabsContent value="pricing" className="mt-6">
                <Suspense fallback={<CosmicLoader />}>
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle>Pricing</CardTitle>
                      <CardDescription>Manage your service packages</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <PricingForm userId={userData.id} />
                    </CardContent>
                  </Card>
                </Suspense>
              </TabsContent>
              
              <TabsContent value="availability" className="mt-6">
                <Suspense fallback={<CosmicLoader />}>
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle>Availability</CardTitle>
                      <CardDescription>Set your available time slots</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AvailabilityManager userId={userData.id} />
                    </CardContent>
                  </Card>
                </Suspense>
              </TabsContent>
            </>
          )}
          
          <TabsContent value="profile" className="mt-6">
            <Suspense fallback={<CosmicLoader />}>
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileForm userId={userData.id} userType={userData.account_type} />
                </CardContent>
              </Card>
            </Suspense>
          </TabsContent>
        </Tabs>
      </>
    );
  };

  return renderDashboard();
}