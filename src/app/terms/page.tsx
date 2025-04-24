"use client";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
      <p className="mb-6 text-muted-foreground">Please read these terms and conditions carefully before using PhotoLogic.</p>
      <ul className="list-disc ml-6 space-y-2">
        <li>By using our platform, you agree to abide by all rules and policies.</li>
        <li>All bookings and payments are subject to our cancellation and refund policy.</li>
        <li>Photographers are independent contractors, not employees of PhotoLogic.</li>
        <li>PhotoLogic is not responsible for any direct or indirect damages arising from use of the platform.</li>
      </ul>
    </div>
  );
}
