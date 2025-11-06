// User types
export interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  gender?: string;
  location?: {
    latitude: number;
    longitude: number;
    city?: string;
  };
  interests: string[];
  platformGoals: string[];
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Product types
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  specifications: Record<string, string>;
  highlights: string[];
  reviews?: Review[];
  founderStory?: {
    founderName: string;
    founderImage: string;
    story: string;
    inspiration: string;
  };
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// Onboarding types
export interface OnboardingData {
  demographics?: {
    name: string;
    age: number;
    gender: string;
    location: {
      latitude: number;
      longitude: number;
      city?: string;
    };
  };
  interests?: string[];
  platformGoals?: string[];
}

// Retailer types
export interface RetailerLead {
  id: string;
  brandName: string;
  email: string;
  phone: string;
  productCategory: string;
  message: string;
  createdAt: string;
}

// Product categories
export const PRODUCT_CATEGORIES = [
  "Fashion",
  "Smart Wearables",
  "Beauty",
  "Health & Wellness",
  "Home & Living",
  "Electronics",
  "Fitness",
  "Food & Snacks",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

// Platform goals
export const PLATFORM_GOALS = [
  "Discover trending products",
  "Make informed purchase decisions",
  "Learn about brands and stories",
  "Find products that match my lifestyle",
  "Visibility on hidden product/brands which are doing great",
] as const;

export type PlatformGoal = (typeof PLATFORM_GOALS)[number];
