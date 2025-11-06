"use client";

import { useAuth } from "@/contexts/AuthContext";
import { OnboardingSteps } from "@/components/auth/OnboardingSteps";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OnboardingPage() {
  const { user, updateUser, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else if (user?.onboardingCompleted) {
      router.push("/");
    }
  }, [isAuthenticated, user, router]);

  const handleComplete = (data: {
    name: string;
    age: number;
    gender: string;
    location: { latitude: number; longitude: number; city?: string };
    interests: string[];
    platformGoals: string[];
  }) => {
    updateUser({
      name: data.name,
      age: data.age,
      gender: data.gender,
      location: data.location,
      interests: data.interests,
      platformGoals: data.platformGoals,
      onboardingCompleted: true,
    });

    router.push("/");
  };

  if (!isAuthenticated || user?.onboardingCompleted) {
    return null;
  }

  return <OnboardingSteps onComplete={handleComplete} />;
}
