"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import { Product, PRODUCT_CATEGORIES } from "@/types";
import {
  Sparkles,
  ShoppingBag,
  LogOut,
  TrendingUp,
  Award,
  Zap,
  ChevronRight,
  Shirt,
  Watch,
  Sparkle,
  Heart,
  Home,
  Laptop,
  Dumbbell,
  Apple,
} from "lucide-react";

export default function HomePage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    } else if (
      !isLoading &&
      isAuthenticated &&
      user &&
      !user.onboardingCompleted
    ) {
      router.push("/onboarding");
    }
  }, [isLoading, isAuthenticated, user, router]);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  if (isLoading || !isAuthenticated || !user?.onboardingCompleted) {
    return null;
  }

  // Get curated products based on user interests
  const curatedProducts = products.filter((p) =>
    user.interests.includes(p.category)
  );

  // Get products by category
  const getProductsByCategory = (category: string) => {
    return products.filter((p) => p.category === category);
  };

  // Get trending products (newest or highest priced for demo)
  const trendingProducts = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 4);

  // Get best value products (good price range)
  const bestValueProducts = products.filter(
    (p) => p.price >= 40 && p.price <= 100
  );

  // Filter products by selected category
  const displayedProducts = selectedCategory
    ? getProductsByCategory(selectedCategory)
    : products;

  // Get icon for each category
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      Fashion: <Shirt className="h-7 w-7 md:h-9 md:w-9" />,
      "Smart Wearables": <Watch className="h-7 w-7 md:h-9 md:w-9" />,
      Beauty: <Sparkle className="h-7 w-7 md:h-9 md:w-9" />,
      "Health & Wellness": <Heart className="h-7 w-7 md:h-9 md:w-9" />,
      "Home & Living": <Home className="h-7 w-7 md:h-9 md:w-9" />,
      Electronics: <Laptop className="h-7 w-7 md:h-9 md:w-9" />,
      Fitness: <Dumbbell className="h-7 w-7 md:h-9 md:w-9" />,
      "Food & Snacks": <Apple className="h-7 w-7 md:h-9 md:w-9" />,
    };
    return icons[category] || <ShoppingBag className="h-7 w-7 md:h-9 md:w-9" />;
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glass-strong border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <ShoppingBag className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-yellow-300 bg-clip-text text-transparent">
                Broadway
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium">Welcome, {user.name}!</p>
                <p className="text-xs text-muted-foreground">
                  {user.interests.join(", ")}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="transition-smooth"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(234, 179, 8, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(234, 179, 8, 0.4) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(234, 179, 8, 0.4) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-4 md:mb-6">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Sparkles className="h-10 w-10 md:h-12 md:w-12 text-primary" />
              </motion.div>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              Shopping that teaches you{" "}
              <span className="bg-gradient-to-r from-primary to-yellow-300 bg-clip-text text-transparent">
                why
              </span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8">
              Discover products curated for you. Ask our AI assistant anything,
              compare side-by-side, and make informed decisions.
            </p>

            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {user.platformGoals.slice(0, 3).map((goal, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-primary/10 text-primary text-xs md:text-sm border border-primary/20">
                    {goal}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Curated For You Section */}
      {curatedProducts.length > 0 && (
        <section className="container mx-auto px-4 pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 md:mb-8"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <Sparkles className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                Curated For You
              </h3>
              <Button variant="ghost" className="gap-2" size="sm">
                View All <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm md:text-base text-muted-foreground">
              Based on your interests: {user.interests.join(", ")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {curatedProducts.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="container mx-auto px-4 pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Shop by Category
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-4 mb-8">
            {PRODUCT_CATEGORIES.map((category, index) => {
              const categoryProducts = getProductsByCategory(category);
              const isSelected = selectedCategory === category;

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card
                    className={`glass cursor-pointer p-4 md:p-5 text-center rounded-2xl transition-all ${
                      isSelected
                        ? "border-primary bg-primary/10 shadow-elegant"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() =>
                      setSelectedCategory(
                        isSelected ? null : category
                      )
                    }
                  >
                    <div className="mb-3">
                      <div
                        className={`w-14 h-14 md:w-16 md:h-16 mx-auto rounded-2xl flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-gradient-to-br from-primary/30 to-primary/10 shadow-lg"
                            : "bg-muted hover:bg-primary/5"
                        }`}
                      >
                        <div
                          className={`${
                            isSelected ? "text-primary" : "text-muted-foreground"
                          }`}
                        >
                          {getCategoryIcon(category)}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm font-semibold mb-1.5 line-clamp-2">
                      {category}
                    </p>
                    <Badge
                      variant={isSelected ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {categoryProducts.length} items
                    </Badge>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-semibold">{selectedCategory}</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  Clear Filter
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Trending Products */}
      {!selectedCategory && (
        <section className="container mx-auto px-4 pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <TrendingUp className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                Trending Now
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {trendingProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Best Value Section */}
      {!selectedCategory && bestValueProducts.length > 0 && (
        <section className="container mx-auto px-4 pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h3 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <Award className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                Best Value
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {bestValueProducts.slice(0, 4).map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* All Products / Filtered Category */}
      {selectedCategory && (
        <section className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {displayedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>
      )}

      {/* Quick Stats Banner */}
      <section className="container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="glass-strong rounded-3xl p-6 md:p-8 bg-gradient-to-r from-primary/10 to-transparent">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
              <div>
                <Zap className="h-8 w-8 md:h-10 md:w-10 mx-auto mb-2 text-primary" />
                <p className="text-2xl md:text-3xl font-bold mb-1">
                  {products.length}+
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Products
                </p>
              </div>
              <div>
                <Award className="h-8 w-8 md:h-10 md:w-10 mx-auto mb-2 text-primary" />
                <p className="text-2xl md:text-3xl font-bold mb-1">
                  {PRODUCT_CATEGORIES.length}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Categories
                </p>
              </div>
              <div>
                <Sparkles className="h-8 w-8 md:h-10 md:w-10 mx-auto mb-2 text-primary" />
                <p className="text-2xl md:text-3xl font-bold mb-1">AI</p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Powered
                </p>
              </div>
              <div>
                <ShoppingBag className="h-8 w-8 md:h-10 md:w-10 mx-auto mb-2 text-primary" />
                <p className="text-2xl md:text-3xl font-bold mb-1">24/7</p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Support
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
