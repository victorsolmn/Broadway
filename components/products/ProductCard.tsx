"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="h-full"
      >
        <Card className="glass overflow-hidden rounded-3xl shadow-elegant hover:shadow-elegant-lg transition-all duration-500 h-full group">
          {/* Image container with parallax effect */}
          <div className="relative h-64 overflow-hidden bg-muted">
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="glass-strong">
                {product.category}
              </Badge>
            </div>

            {/* AI button hint */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute top-4 right-4"
            >
              <div className="glass-strong p-2 rounded-full">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-2">
              <p className="text-sm text-muted-foreground">{product.brand}</p>
            </div>

            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {product.description}
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.highlights.slice(0, 2).map((highlight, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                >
                  {highlight}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <motion.p
                className="text-2xl font-bold bg-gradient-to-r from-primary to-yellow-300 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                ${product.price}
              </motion.p>
              <motion.span
                className="text-sm text-muted-foreground group-hover:text-primary transition-colors"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                View Details →
              </motion.span>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}
