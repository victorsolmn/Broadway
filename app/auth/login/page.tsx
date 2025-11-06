"use client";

export const runtime = 'edge';

import { useAuth } from "@/contexts/AuthContext";
import { AuthForm } from "@/components/auth/AuthForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { login, isAuthenticated, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.onboardingCompleted) {
        router.push("/");
      } else {
        router.push("/onboarding");
      }
    }
  }, [isAuthenticated, user, router]);

  const handleSuccess = () => {
    // Router will handle redirect via useEffect
  };

  return <AuthForm type="login" onSubmit={login} onSuccess={handleSuccess} />;
}
