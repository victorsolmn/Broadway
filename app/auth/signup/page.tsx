"use client";

export const runtime = 'edge';

import { useAuth } from "@/contexts/AuthContext";
import { AuthForm } from "@/components/auth/AuthForm";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();

  const handleSuccess = () => {
    // After successful signup, redirect to onboarding
    router.push("/onboarding");
  };

  return <AuthForm type="signup" onSubmit={signup} onSuccess={handleSuccess} />;
}
