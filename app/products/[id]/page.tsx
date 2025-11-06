"use client";

import { useState, use } from "react";

export const runtime = 'edge';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { AIChat } from "@/components/products/AIChat";
import { products } from "@/data/products";
import { getSimilarProducts } from "@/lib/mockAI";
import {
  ArrowLeft,
  Sparkles,
  GitCompare,
  ShoppingCart,
  Star,
} from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  const product = products.find((p) => p.id === resolvedParams.id);
  const similarProducts = product
    ? getSimilarProducts(product, products)
    : [];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="glass-strong p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Button onClick={() => router.push("/")}>Return Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Navigation */}
      <nav className="glass-strong border-b border-border/50 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass overflow-hidden rounded-3xl shadow-elegant p-4">
              <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-4 bg-muted">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 w-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">
                by {product.brand}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  4.8 (127 reviews)
                </span>
              </div>

              <motion.p
                className="text-5xl font-bold bg-gradient-to-r from-primary to-yellow-300 bg-clip-text text-transparent"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                ${product.price}
              </motion.p>
            </div>

            {/* Highlights */}
            <Card className="glass border-primary/20 p-4 rounded-2xl">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Key Features
              </h3>
              <ul className="space-y-2">
                {product.highlights.map((highlight, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="flex-1 transition-smooth hover:scale-[1.02] gap-2"
                onClick={() => setIsAIChatOpen(true)}
              >
                <Sparkles className="h-5 w-5" />
                Ask Broadway AI
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1 transition-smooth hover:scale-[1.02] gap-2"
              >
                <GitCompare className="h-5 w-5" />
                Compare
              </Button>
            </div>

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-yellow-500 hover:from-primary/90 hover:to-yellow-500/90 transition-smooth gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="glass rounded-3xl p-6">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start mb-6">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-4">
                <h3 className="text-xl font-semibold">About this product</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {product.highlights.map((highlight, index) => (
                    <Card
                      key={index}
                      className="glass-strong p-4 text-center rounded-2xl"
                    >
                      <p className="text-sm font-medium">{highlight}</p>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">
                  Technical Specifications
                </h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-3 border-b border-border/50"
                      >
                        <span className="font-medium">{key}</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">
                  Customer Reviews
                </h3>
                <div className="space-y-4">
                  {/* Mock Reviews */}
                  {[
                    {
                      name: "Sarah M.",
                      rating: 5,
                      comment:
                        "Absolutely love this product! Excellent quality and exactly as described.",
                      date: "2 days ago",
                    },
                    {
                      name: "Mike R.",
                      rating: 5,
                      comment:
                        "Great value for money. The AI assistant helped me understand all the features before buying.",
                      date: "1 week ago",
                    },
                    {
                      name: "Emily K.",
                      rating: 4,
                      comment:
                        "Very satisfied with my purchase. Fast shipping and great customer service!",
                      date: "2 weeks ago",
                    },
                  ].map((review, index) => (
                    <Card key={index} className="glass-strong p-4 rounded-2xl">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">{review.name}</p>
                          <div className="flex gap-1 mt-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 fill-primary text-primary"
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {review.comment}
                      </p>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>

        {/* Founder's Story */}
        {product.founderStory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <Card className="glass rounded-3xl overflow-hidden shadow-elegant">
              <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 border-b border-border/50">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <Sparkles className="h-7 w-7 text-primary" />
                  Founder's Story
                </h2>
                <p className="text-muted-foreground mt-2">
                  Meet the person behind {product.brand}
                </p>
              </div>

              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Founder Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="lg:col-span-1"
                  >
                    <div className="relative h-80 lg:h-full rounded-2xl overflow-hidden shadow-elegant">
                      <Image
                        src={product.founderStory.founderImage}
                        alt={product.founderStory.founderName}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {product.founderStory.founderName}
                        </h3>
                        <p className="text-white/80 text-sm">
                          Founder & CEO, {product.brand}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Story Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="lg:col-span-2 space-y-6"
                  >
                    <div>
                      <h4 className="text-xl font-semibold mb-4">The Journey</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {product.founderStory.story}
                      </p>
                    </div>

                    <Card className="glass-strong border-primary/20 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent">
                      <div className="flex items-start gap-3">
                        <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h5 className="font-semibold mb-2 text-primary">
                            Our Inspiration
                          </h5>
                          <p className="text-sm leading-relaxed italic">
                            "{product.founderStory.inspiration}"
                          </p>
                        </div>
                      </div>
                    </Card>

                    <div className="flex flex-wrap gap-3 pt-4">
                      <Badge variant="secondary" className="px-4 py-2">
                        {product.category}
                      </Badge>
                      <Badge variant="secondary" className="px-4 py-2">
                        Est. {product.brand}
                      </Badge>
                    </div>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProducts.map((similarProduct, index) => (
                <Link key={similarProduct.id} href={`/products/${similarProduct.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Card className="glass overflow-hidden rounded-3xl shadow-elegant hover:shadow-elegant-lg transition-all duration-500 group cursor-pointer">
                      <div className="relative h-48 bg-muted">
                        <Image
                          src={similarProduct.images[0]}
                          alt={similarProduct.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-muted-foreground mb-1">
                          {similarProduct.brand}
                        </p>
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                          {similarProduct.name}
                        </h3>
                        <p className="text-lg font-bold text-primary">
                          ${similarProduct.price}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* AI Chat Modal */}
      <AIChat
        product={product}
        isOpen={isAIChatOpen}
        onClose={() => setIsAIChatOpen(false)}
      />
    </div>
  );
}
