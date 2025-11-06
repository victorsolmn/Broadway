import { Product } from "@/types";

export const products: Product[] = [
  // Fashion
  {
    id: "1",
    name: "Premium Leather Jacket",
    brand: "Urban Heritage",
    price: 299,
    description:
      "Crafted from genuine Italian leather, this jacket combines timeless style with modern durability. Features asymmetric zipper, multiple pockets, and premium hardware.",
    category: "Fashion",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800",
    ],
    specifications: {
      Material: "100% Genuine Leather",
      Lining: "Polyester blend",
      "Closure Type": "Zipper",
      "Care Instructions": "Professional leather clean only",
    },
    highlights: [
      "Genuine Italian leather",
      "YKK premium zippers",
      "Quilted shoulder detailing",
      "Multiple interior pockets",
    ],
    founderStory: {
      founderName: "Marco Bellini",
      founderImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
      story: "Growing up in Florence, I watched my grandfather craft leather goods in his small workshop. The smell of Italian leather, the precision of each stitch, and the pride in creating something that would last a lifetime - these memories inspired me to start Urban Heritage. After years in fast fashion, I realized we had lost touch with craftsmanship. I wanted to bring back the tradition of creating pieces that tell a story, that age beautifully, and that you'd want to pass down to the next generation.",
      inspiration: "Every jacket is a bridge between Italian tradition and modern design. When you wear Urban Heritage, you're not just wearing leather - you're carrying forward a legacy of craftsmanship that spans generations.",
    },
  },
  {
    id: "2",
    name: "Minimalist Canvas Sneakers",
    brand: "EcoStride",
    price: 89,
    description:
      "Sustainable fashion meets comfort. These sneakers are made from organic cotton canvas and recycled rubber soles. Perfect for everyday wear.",
    category: "Fashion",
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800",
    ],
    specifications: {
      "Upper Material": "Organic cotton canvas",
      "Sole Material": "Recycled rubber",
      "Insole": "Memory foam",
      Fit: "True to size",
    },
    highlights: [
      "Eco-friendly materials",
      "Memory foam insole",
      "Breathable canvas",
      "Lightweight design",
    ],
    founderStory: {
      founderName: "Sarah Chen",
      founderImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800",
      story: "After volunteering at a beach cleanup in Thailand, I was devastated by the amount of plastic waste washing ashore. I came home determined to create fashion that doesn't cost the earth. My background in sustainable design led me to experiment with recycled materials, and EcoStride was born. Every pair of sneakers uses the equivalent of 6 plastic bottles and organic cotton. It took 3 years to perfect the formula - comfort without compromise, style without guilt.",
      inspiration: "Fashion should make you feel good in every way. When you walk in EcoStride, you're walking towards a better future - one step at a time.",
    },
  },

  // Smart Wearables
  {
    id: "3",
    name: "FitTrack Pro Smartwatch",
    brand: "TechLife",
    price: 249,
    description:
      "Advanced fitness tracking with heart rate monitoring, GPS, and 7-day battery life. Track your workouts, monitor sleep, and stay connected on the go.",
    category: "Smart Wearables",
    images: [
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    ],
    specifications: {
      Display: "1.4-inch AMOLED",
      "Battery Life": "7 days",
      "Water Resistance": "5ATM",
      Connectivity: "Bluetooth 5.0",
    },
    highlights: [
      "24/7 heart rate monitoring",
      "Built-in GPS",
      "50+ sport modes",
      "Sleep tracking",
    ],
  },
  {
    id: "4",
    name: "Wireless Sport Earbuds",
    brand: "AudioFit",
    price: 129,
    description:
      "Premium sound quality meets active lifestyle. Sweat-resistant wireless earbuds with noise cancellation and 30-hour battery life with charging case.",
    category: "Smart Wearables",
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800",
      "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800",
    ],
    specifications: {
      "Driver Size": "12mm dynamic",
      "Battery Life": "8h + 22h case",
      "Charging": "USB-C fast charge",
      "Water Rating": "IPX7",
    },
    highlights: [
      "Active noise cancellation",
      "Touch controls",
      "Secure fit design",
      "Premium audio quality",
    ],
  },

  // Beauty
  {
    id: "5",
    name: "Radiance Glow Serum",
    brand: "PureGlow",
    price: 65,
    description:
      "Vitamin C-infused brightening serum that reduces dark spots and evens skin tone. Formulated with hyaluronic acid for deep hydration.",
    category: "Beauty",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800",
    ],
    specifications: {
      "Key Ingredients": "Vitamin C, Hyaluronic Acid",
      Volume: "30ml",
      "Skin Type": "All types",
      "Cruelty-Free": "Yes",
    },
    highlights: [
      "20% Vitamin C concentration",
      "Brightens complexion",
      "Reduces fine lines",
      "Dermatologist tested",
    ],
    founderStory: {
      founderName: "Dr. Maya Patel",
      founderImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800",
      story: "As a dermatologist, I spent years treating patients with complex skincare routines that overwhelmed them. I saw brilliant people struggle with 10-step regimens when what they really needed was one powerful, scientifically-backed formula. My mother's battle with hyperpigmentation inspired me to create something effective yet simple. After 5 years of research and testing on my own skin, PureGlow was born - clinical-grade results in a bottle you'd actually use every day.",
      inspiration: "Your skin tells your story. PureGlow is about giving you the confidence to let your natural radiance shine through, without hiding behind layers of complexity.",
    },
  },
  {
    id: "6",
    name: "Natural Clay Face Mask",
    brand: "Earth Elements",
    price: 42,
    description:
      "Detoxifying clay mask with activated charcoal. Draws out impurities, minimizes pores, and leaves skin refreshed and balanced.",
    category: "Beauty",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800",
    ],
    specifications: {
      "Key Ingredients": "Kaolin clay, Activated charcoal",
      Volume: "100ml",
      "Application Time": "10-15 minutes",
      "Natural": "100%",
    },
    highlights: [
      "Deep pore cleansing",
      "Oil control",
      "Natural ingredients",
      "Suitable for sensitive skin",
    ],
  },

  // Health & Wellness
  {
    id: "7",
    name: "Organic Protein Powder",
    brand: "NutriPure",
    price: 49,
    description:
      "Plant-based protein blend with 25g protein per serving. Made from organic pea, brown rice, and quinoa. No artificial sweeteners.",
    category: "Health & Wellness",
    images: [
      "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=800",
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800",
    ],
    specifications: {
      "Protein per Serving": "25g",
      Servings: "30",
      Flavor: "Vanilla Bean",
      Certifications: "USDA Organic, Non-GMO",
    },
    highlights: [
      "Plant-based blend",
      "Complete amino acid profile",
      "No artificial ingredients",
      "Easy to digest",
    ],
    founderStory: {
      founderName: "James Rodriguez",
      founderImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800",
      story: "I was training for my first marathon when I discovered my lactose intolerance was holding me back. Every protein shake left me feeling worse, not better. As a nutritionist, I knew there had to be a better way. I spent nights in my kitchen, testing plant-based formulas on myself, tracking every metric. When I finally crossed that marathon finish line fueled by my own creation, I knew I had to share it. NutriPure isn't just about protein - it's about unlocking your potential without compromise.",
      inspiration: "Your body is your most important tool. Fuel it with something that honors both your goals and your values. Pure nutrition, pure performance, pure you.",
    },
  },
  {
    id: "8",
    name: "Superfood Energy Bars",
    brand: "VitalSnack",
    price: 28,
    description:
      "Nutrient-dense energy bars packed with dates, nuts, and superfoods. Perfect pre or post-workout fuel. Pack of 12 bars.",
    category: "Food & Snacks",
    images: [
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800",
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800",
    ],
    specifications: {
      Quantity: "12 bars",
      "Weight per Bar": "45g",
      Calories: "200 per bar",
      "Shelf Life": "12 months",
    },
    highlights: [
      "Whole food ingredients",
      "No refined sugar",
      "Rich in fiber",
      "Gluten-free",
    ],
  },
];
