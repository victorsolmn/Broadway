"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRODUCT_CATEGORIES, PLATFORM_GOALS } from "@/types";
import { MapPin } from "lucide-react";

interface OnboardingStepsProps {
  onComplete: (data: {
    name: string;
    age: number;
    gender: string;
    location: { latitude: number; longitude: number; city?: string };
    interests: string[];
    platformGoals: string[];
  }) => void;
}

export function OnboardingSteps({ onComplete }: OnboardingStepsProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Step 1: Demographics
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    city?: string;
  } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  // Step 2: Interests
  const [interests, setInterests] = useState<string[]>([]);

  // Step 3: Platform Goals
  const [platformGoals, setPlatformGoals] = useState<string[]>([]);

  const [error, setError] = useState("");

  const getLocation = async () => {
    setLocationLoading(true);
    setError("");

    if (typeof window === "undefined" || !navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLocationLoading(false);
      return;
    }

    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Try to get city name from coordinates (reverse geocoding)
          // For MVP, we'll just store coordinates
          setLocation({
            latitude,
            longitude,
            city: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
          });
          setLocationLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError(
            "Unable to get location. You can skip this for now."
          );
          setLocationLoading(false);
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } catch (error) {
      console.error("Geolocation error:", error);
      setError("Error accessing location. You can skip this for now.");
      setLocationLoading(false);
    }
  };

  const skipLocation = () => {
    // Set a default location if user skips
    setLocation({
      latitude: 0,
      longitude: 0,
      city: "Location not set",
    });
  };

  const handleNext = () => {
    setError("");

    if (step === 1) {
      if (!name || !age || !gender || !location) {
        setError("Please fill in all fields and pin your location");
        return;
      }
      if (parseInt(age) < 13 || parseInt(age) > 120) {
        setError("Please enter a valid age");
        return;
      }
    }

    if (step === 2 && interests.length === 0) {
      setError("Please select at least one interest");
      return;
    }

    if (step === 3 && platformGoals.length === 0) {
      setError("Please select at least one goal");
      return;
    }

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      onComplete({
        name,
        age: parseInt(age),
        gender,
        location: location!,
        interests,
        platformGoals,
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setError("");
      setStep(step - 1);
    }
  };

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const toggleGoal = (goal: string) => {
    setPlatformGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card className="glass-strong shadow-elegant-lg rounded-3xl p-8">
          {/* Header */}
          <div className="mb-8">
            <motion.h1
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-yellow-300 bg-clip-text text-transparent"
            >
              {step === 1
                ? "Tell us about yourself"
                : step === 2
                ? "What interests you?"
                : "Why Broadway?"}
            </motion.h1>
            <p className="text-muted-foreground">
              {step === 1
                ? "We'll personalize your experience"
                : step === 2
                ? "Select categories you're interested in"
                : "Help us understand your goals"}
            </p>

            {/* Progress bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Step {step} of {totalSteps}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {/* Steps */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-6"
              >
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="mt-2"
                      min="13"
                      max="120"
                    />
                  </div>

                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={gender} onValueChange={setGender}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Location (Optional)</Label>
                  <div className="flex gap-2 mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={getLocation}
                      disabled={locationLoading || !!location}
                      className="flex-1"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      {locationLoading
                        ? "Getting location..."
                        : location
                        ? `${location.city}`
                        : "Pin My Location"}
                    </Button>
                    {!location && !locationLoading && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={skipLocation}
                        className="flex-shrink-0"
                      >
                        Skip
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Help us show you relevant local products
                  </p>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  {PRODUCT_CATEGORIES.map((category) => (
                    <motion.div
                      key={category}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className={`p-4 cursor-pointer transition-smooth ${
                          interests.includes(category)
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => toggleInterest(category)}
                      >
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={interests.includes(category)}
                            onCheckedChange={() => toggleInterest(category)}
                          />
                          <span className="font-medium">{category}</span>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-4"
              >
                {PLATFORM_GOALS.map((goal) => (
                  <motion.div
                    key={goal}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-smooth ${
                        platformGoals.includes(goal)
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => toggleGoal(goal)}
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={platformGoals.includes(goal)}
                          onCheckedChange={() => toggleGoal(goal)}
                        />
                        <span className="font-medium">{goal}</span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error message */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-destructive mt-4"
            >
              {error}
            </motion.p>
          )}

          {/* Navigation */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex-1"
              >
                Back
              </Button>
            )}
            <Button
              type="button"
              onClick={handleNext}
              className="flex-1 transition-smooth hover:scale-[1.02]"
            >
              {step === totalSteps ? "Complete" : "Continue"}
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
