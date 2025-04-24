"use client";

export default function SuccessStoriesPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Success Stories</h1>
      <p className="mb-6 text-muted-foreground">See how PhotoLogic has helped clients and photographers create lasting memories.</p>
      <div className="space-y-6">
        <div className="p-4 border rounded bg-muted">
          <p className="font-semibold">"PhotoLogic made it so easy to find the perfect photographer for our wedding!"</p>
          <span className="text-xs text-muted-foreground">- Priya & Rahul</span>
        </div>
        <div className="p-4 border rounded bg-muted">
          <p className="font-semibold">"As a photographer, I found more clients in one month than the whole previous year."</p>
          <span className="text-xs text-muted-foreground">- Arjun, Photographer</span>
        </div>
      </div>
    </div>
  );
}
