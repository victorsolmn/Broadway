"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Sparkles,
  Star,
  Heart,
  Zap,
  Award,
  TrendingUp,
  Gift,
} from "lucide-react";

interface FloatingIcon {
  id: number;
  Icon: any;
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  velocityX: number;
  velocityY: number;
}

const ICONS = [
  ShoppingBag,
  Sparkles,
  Star,
  Heart,
  Zap,
  Award,
  TrendingUp,
  Gift,
];

const COLORS = [
  "rgba(234, 179, 8, 0.15)", // primary yellow
  "rgba(234, 179, 8, 0.1)",
  "rgba(234, 179, 8, 0.08)",
  "rgba(255, 215, 0, 0.12)",
  "rgba(255, 193, 7, 0.1)",
];

export function AnimatedBackground() {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // Initialize floating icons
  useEffect(() => {
    const createIcons = () => {
      const newIcons: FloatingIcon[] = [];
      const iconCount = 25;

      for (let i = 0; i < iconCount; i++) {
        newIcons.push({
          id: i,
          Icon: ICONS[Math.floor(Math.random() * ICONS.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 40 + 20,
          speed: Math.random() * 0.3 + 0.1,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.3 + 0.1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          velocityX: (Math.random() - 0.5) * 0.02,
          velocityY: (Math.random() - 0.5) * 0.02,
        });
      }

      setIcons(newIcons);
    };

    createIcons();
  }, []);

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || e.touches.length === 0) return;
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      setTouchPos({
        x: ((touch.clientX - rect.left) / rect.width) * 100,
        y: ((touch.clientY - rect.top) / rect.height) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setIcons((prevIcons) =>
        prevIcons.map((icon) => {
          let { x, y, rotation, velocityX, velocityY } = icon;

          // Update position
          x += velocityX;
          y += velocityY;

          // Bounce off edges
          if (x <= 0 || x >= 100) velocityX *= -1;
          if (y <= 0 || y >= 100) velocityY *= -1;

          // Ensure within bounds
          x = Math.max(0, Math.min(100, x));
          y = Math.max(0, Math.min(100, y));

          // Interactive repulsion from cursor/touch
          const interactionX = mousePos.x || touchPos.x;
          const interactionY = mousePos.y || touchPos.y;

          if (interactionX && interactionY) {
            const dx = x - interactionX;
            const dy = y - interactionY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Repulsion within 15% radius
            if (distance < 15 && distance > 0) {
              const force = (15 - distance) / 15;
              velocityX += (dx / distance) * force * 0.1;
              velocityY += (dy / distance) * force * 0.1;

              // Limit velocity
              const maxVelocity = 0.5;
              const currentSpeed = Math.sqrt(
                velocityX * velocityX + velocityY * velocityY
              );
              if (currentSpeed > maxVelocity) {
                velocityX = (velocityX / currentSpeed) * maxVelocity;
                velocityY = (velocityY / currentSpeed) * maxVelocity;
              }
            }
          }

          // Apply friction
          velocityX *= 0.98;
          velocityY *= 0.98;

          // Update rotation
          rotation += icon.rotationSpeed;

          return {
            ...icon,
            x,
            y,
            rotation,
            velocityX,
            velocityY,
          };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos, touchPos]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at top, rgba(234, 179, 8, 0.05) 0%, transparent 50%), radial-gradient(ellipse at bottom, rgba(234, 179, 8, 0.03) 0%, transparent 50%)",
      }}
    >
      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(234, 179, 8, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(234, 179, 8, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, rgba(234, 179, 8, 0.08) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating icons */}
      {icons.map((icon) => {
        const IconComponent = icon.Icon;
        return (
          <motion.div
            key={icon.id}
            className="absolute"
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              width: icon.size,
              height: icon.size,
            }}
            animate={{
              rotate: icon.rotation,
            }}
            transition={{
              duration: 0,
            }}
          >
            <IconComponent
              className="w-full h-full"
              style={{
                color: icon.color,
                opacity: icon.opacity,
                filter: "blur(1px)",
              }}
            />
          </motion.div>
        );
      })}

      {/* Sparkle effects near cursor/touch */}
      {(mousePos.x > 0 || touchPos.x > 0) && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: `${mousePos.x || touchPos.x}%`,
            top: `${mousePos.y || touchPos.y}%`,
            width: 100,
            height: 100,
            marginLeft: -50,
            marginTop: -50,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        >
          <Sparkles
            className="w-full h-full text-primary"
            style={{ filter: "blur(2px)" }}
          />
        </motion.div>
      )}
    </div>
  );
}
