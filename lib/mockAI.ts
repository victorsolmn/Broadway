import { Product } from "@/types";

// Mock AI responses for product questions
export const askBroadway = async (
  question: string,
  product: Product
): Promise<string> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const lowerQuestion = question.toLowerCase();

  // Pattern matching for common questions
  if (
    lowerQuestion.includes("material") ||
    lowerQuestion.includes("made of") ||
    lowerQuestion.includes("fabric")
  ) {
    return `Great question! The ${product.name} is made from ${
      Object.values(product.specifications)[0]
    }. This material was chosen for its durability and comfort. ${
      product.highlights[0]
    } makes it stand out from similar products in the market.`;
  }

  if (
    lowerQuestion.includes("worth") ||
    lowerQuestion.includes("recommend") ||
    lowerQuestion.includes("buy")
  ) {
    return `Based on the ${product.category} category and $${product.price} price point, the ${product.name} offers excellent value. Key benefits include: ${product.highlights[0]}, ${product.highlights[1]}, and ${product.highlights[2]}. It's particularly great for users who value quality and ${product.brand}'s reputation for excellence.`;
  }

  if (
    lowerQuestion.includes("compare") ||
    lowerQuestion.includes("better") ||
    lowerQuestion.includes("alternative")
  ) {
    return `The ${product.name} by ${product.brand} stands out in the ${product.category} category with features like ${product.highlights[0]} and ${product.highlights[1]}. While there are other options in the market, this product offers a unique combination of quality and value at $${product.price}. Would you like me to help you compare it with similar products?`;
  }

  if (
    lowerQuestion.includes("size") ||
    lowerQuestion.includes("fit") ||
    lowerQuestion.includes("sizing")
  ) {
    const sizeSpec = Object.entries(product.specifications).find(([key]) =>
      key.toLowerCase().includes("fit")
    );
    if (sizeSpec) {
      return `According to the specifications, the ${product.name} ${sizeSpec[1]}. ${product.highlights[0]} ensures you get the right fit. I'd recommend checking the detailed size chart for the best match!`;
    }
    return `The ${product.name} comes in standard sizing. ${product.highlights[0]} ensures a comfortable fit for most users. For specific measurements, please refer to the specifications tab.`;
  }

  if (
    lowerQuestion.includes("care") ||
    lowerQuestion.includes("clean") ||
    lowerQuestion.includes("maintain")
  ) {
    const careSpec = Object.entries(product.specifications).find(([key]) =>
      key.toLowerCase().includes("care")
    );
    if (careSpec) {
      return `To keep your ${product.name} in great condition: ${careSpec[1]}. This will help maintain ${product.highlights[0]} for years to come. ${product.brand} recommends following these guidelines for best results.`;
    }
    return `For the ${product.name}, I recommend gentle care to maintain its quality. ${product.highlights[0]} ensures durability, but proper maintenance will extend its lifespan even further.`;
  }

  if (
    lowerQuestion.includes("review") ||
    lowerQuestion.includes("rating") ||
    lowerQuestion.includes("opinion")
  ) {
    return `The ${product.name} has been highly praised for ${product.highlights[0]} and ${product.highlights[1]}. Users particularly love how ${product.description.split(".")[0].toLowerCase()}. At $${product.price}, it offers excellent value in the ${product.category} category. ${product.brand} has a strong reputation for quality products.`;
  }

  if (
    lowerQuestion.includes("ship") ||
    lowerQuestion.includes("deliver") ||
    lowerQuestion.includes("arrive")
  ) {
    return `Great question! While specific shipping times vary by location, the ${product.name} typically ships within 2-3 business days. ${product.brand} products are known for ${product.highlights[0]}, and we ensure the same care in delivery. You'll receive tracking information once your order ships!`;
  }

  if (
    lowerQuestion.includes("return") ||
    lowerQuestion.includes("refund") ||
    lowerQuestion.includes("exchange")
  ) {
    return `We want you to love your ${product.name}! We offer a 30-day return policy on most items. Given the ${product.highlights[0]} and quality construction, we're confident you'll be satisfied. If not, returns are hassle-free with full refund available.`;
  }

  // Default response with product details
  return `I'd be happy to help you learn more about the ${product.name} by ${product.brand}! This ${product.category} product is priced at $${product.price} and features: ${product.highlights[0]}, ${product.highlights[1]}, and ${product.highlights[2]}. ${product.description} What specific aspect would you like to know more about?`;
};

// Get similar products for comparison
export const getSimilarProducts = (
  currentProduct: Product,
  allProducts: Product[]
): Product[] => {
  return allProducts
    .filter(
      (p) =>
        p.category === currentProduct.category && p.id !== currentProduct.id
    )
    .slice(0, 3);
};
