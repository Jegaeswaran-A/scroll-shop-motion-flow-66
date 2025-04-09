
import { useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    description: 'Immersive sound quality with noise cancellation',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    tag: 'Best Seller'
  },
  {
    id: 2,
    name: 'Minimalist Watch',
    description: 'Elegant design with premium materials',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    tag: 'New'
  },
  {
    id: 3,
    name: 'Wireless Earbuds',
    description: 'Crystal clear audio with long battery life',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb',
    tag: 'Sale'
  }
];

const FeaturedProducts = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });
  
  return (
    <section id="featured" className="py-20 bg-background" ref={sectionRef}>
      <div className="container px-4 mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isInView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products designed for those who appreciate quality and style.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className={`bg-card rounded-lg overflow-hidden shadow-lg transition-all duration-700 delay-${index * 100} ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
            >
              <div className="relative h-64 overflow-hidden group">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-0 left-0 m-3">
                  <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
                    {product.tag}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button className="mr-2" size="sm">
                    <ShoppingCart className="mr-1" size={14} />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="icon" className="bg-white/20">
                    <Heart size={16} />
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl mb-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg 
                          key={star} 
                          className="w-4 h-4 fill-yellow-500" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">(24)</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
