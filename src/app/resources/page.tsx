"use client";

export default function ResourcesPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Resources</h1>
      <p className="mb-6 text-muted-foreground">Helpful guides and resources for clients and photographers.</p>
      <ul className="list-disc ml-6 space-y-2">
        <li><b>Getting Started:</b> <a href="/how-it-works" className="text-primary underline">How It Works</a></li>
        <li><b>FAQs:</b> <a href="/faq" className="text-primary underline">Frequently Asked Questions</a></li>
        <li><b>Blog:</b> <a href="/blog" className="text-primary underline">Photography Tips & News</a></li>
      </ul>
    </div>
  );
}
