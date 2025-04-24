"use client";

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>
      <p className="mb-6 text-muted-foreground">PhotoLogic uses cookies to enhance your experience.</p>
      <ul className="list-disc ml-6 space-y-2">
        <li>Cookies help us remember your preferences and improve site functionality.</li>
        <li>You can disable cookies in your browser settings, but some features may not work.</li>
        <li>We do not use cookies for advertising or tracking outside our platform.</li>
      </ul>
    </div>
  );
}
