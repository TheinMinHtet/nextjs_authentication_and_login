"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifySuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    async function verifyEmail() {
      if (!token) return;

      const res = await fetch(`/api/verify?token=${token}`);
      if (res.ok) {
        alert("Email verified successfully! Redirecting to login...");
        router.push("/"); // Option B: redirect to login page
      } else {
        alert(await res.text());
        router.push("/"); // fallback
      }
    }

    verifyEmail();
  }, [token, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <h2 className="text-xl font-semibold">Verifying your email...</h2>
    </div>
  );
}
