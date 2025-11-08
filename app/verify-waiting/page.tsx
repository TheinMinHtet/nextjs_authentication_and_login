"use client";

export default function VerifyWaitingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Please check your email
      </h1>
      <p className="text-gray-600">
        We&#39;ve sent a verification link to your email. Please click the link to verify your account.
      </p>
    </div>
  );
}
