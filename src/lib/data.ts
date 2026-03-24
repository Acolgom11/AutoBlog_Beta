export interface Article {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  slug: string;
}

export const mockArticles: Article[] = [
  {
    title: "Best cars under $10,000 in 2026",
    excerpt: "Finding a reliable used car under $10,000 is getting harder, but these 5 models offer the best value for your money right now.",
    category: "Budget Options",
    date: "Mar 15, 2026",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1562911791-472321d62247?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "best-cars-under-10000"
  },
  {
    title: "Electric cars vs gasoline: full comparison",
    excerpt: "Should you make the switch to electric? We break down the total cost of ownership, driving dynamics, and charging infrastructure.",
    category: "Electric Vehicles",
    date: "Mar 10, 2026",
    readTime: "12 min read",
    imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&auto=format&fit=crop",
    slug: "electric-vs-gasoline"
  },
  {
    title: "Best cars for beginners in 2026",
    excerpt: "Finding a reliable car for beginners is getting harder, but these 5 models offer the best value for your money right now.",
    category: "Buying Guides",
    date: "Mar 10, 2026",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1634673970798-a15ae56f6c65?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "best-cars-for-beginners"
  },
  {
    title: "Top fuel-efficient cars for beginners",
    excerpt: "If you're a new driver looking to save money at the pump, these compact fuel-sippers are the perfect starting point.",
    category: "Buying Guides",
    date: "Mar 05, 2026",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800&auto=format&fit=crop",
    slug: "fuel-efficient-beginner-cars"
  },
  {
    title: "Best hybrid cars in 2026",
    excerpt: "Hybrid cars offer a great balance of fuel efficiency and practicality. Here are the top models to consider this year.",
    category: "Buying Guides",
    date: "May 18, 2025",
    readTime: "25 min read",
    imageUrl: "https://images.unsplash.com/photo-1611073818937-b83cb4e8e3a2?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "best-hybrid-cars-for-2026"
  },
  {
    title: "Second-hand cars cheap and reliable in Spain",
    excerpt: "Looking for a affordable and dependable used car in Spain? Here are the best options for 2026.",
    category: "Buying Guides",
    date: "May 20, 2026",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1770068511800-56d948e55e43?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    slug: "second-hand-cars-in-spain"
  }
];

export const mockCategories = [
  { name: "Car Reviews", slug: "reviews", icon: "steering-wheel" },
  { name: "Electric Vehicles", slug: "electric", icon: "battery-charging" },
  { name: "Budget Options", slug: "budget", icon: "piggy-bank" },
  { name: "Buying Guides", slug: "guides", icon: "book-open" },
];
