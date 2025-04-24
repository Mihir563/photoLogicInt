"use client";

export default function HowItWorksPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">How It Works</h1>
      <p className="mb-6 text-muted-foreground">Discover how PhotoLogic connects you with the best photographers for your needs in just a few steps.</p>
      <ol className="list-decimal ml-6 space-y-3">
        <li><b>Search:</b> Use our search and filter tools to find photographers by style, location, or specialty.</li>
        <li><b>View Profiles:</b> Check detailed profiles, portfolios, and reviews to pick your favorite.</li>
        <li><b>Book & Chat:</b> Instantly book sessions and chat with your chosen photographer.</li>
        <li><b>Enjoy Your Session:</b> Meet up, capture memories, and get your photos delivered digitally.</li>
      </ol>
    </div>
  );
}
