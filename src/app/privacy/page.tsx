"use client";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-6 text-muted-foreground">Your privacy is important to us. This policy explains how we collect, use, and protect your information.</p>
      <ul className="list-disc ml-6 space-y-2">
        <li>We collect only necessary information for account creation and booking.</li>
        <li>Your data is never sold to third parties.</li>
        <li>All payments are processed securely through trusted providers.</li>
        <li>You can request account deletion at any time.</li>
      </ul>
    </div>
  );
}
