
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Minimalist Watch",
    description: "Elegant and simple design for everyday wear. Premium materials and Japanese movement.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "accessories",
    featured: true
  },
  {
    id: "2",
    name: "Premium Headphones",
    description: "Noise-cancelling headphones with premium sound quality and comfort for extended use.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "electronics",
    featured: true
  },
  {
    id: "3",
    name: "Wireless Earbuds",
    description: "True wireless earbuds with premium sound quality and long battery life.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb",
    category: "electronics",
    featured: true
  },
  {
    id: "4",
    name: "Leather Wallet",
    description: "Handcrafted genuine leather wallet with RFID protection.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
    category: "accessories",
    featured: false
  },
  {
    id: "5",
    name: "Smart Speaker",
    description: "Voice-controlled smart speaker with premium sound and assistant features.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc",
    category: "electronics",
    featured: false
  },
  {
    id: "6",
    name: "Desk Lamp",
    description: "Modern desk lamp with adjustable brightness and color temperature.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    category: "home",
    featured: false
  },
  {
    id: "7",
    name: "Mechanical Keyboard",
    description: "Premium mechanical keyboard with RGB lighting and customizable switches.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef",
    category: "electronics",
    featured: true
  },
  {
    id: "8",
    name: "Ceramic Mug Set",
    description: "Set of 4 handcrafted ceramic mugs in modern matte finish.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
    category: "home",
    featured: false
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};
