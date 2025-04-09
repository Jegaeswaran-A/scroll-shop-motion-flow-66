
import { useRef, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: 'Premium Headphones',
    price: '$299',
    image: 'https://images.unsplash.com/photo-1577174881658-0f30ed549adc'
  },
  {
    id: 2,
    name: 'Wireless Earbuds',
    price: '$149',
    image: 'https://images.unsplash.com/photo-1590658589731-3de0535f5462'
  },
  {
    id: 3,
    name: 'Smart Watch',
    price: '$249',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12'
  },
  {
    id: 4,
    name: 'Portable Speaker',
    price: '$179',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1'
  },
  {
    id: 5,
    name: 'Digital Camera',
    price: '$899',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32'
  },
  {
    id: 6,
    name: 'Fitness Tracker',
    price: '$129',
    image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288'
  }
];

const HorizontalScroll = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const scrollAmount = 400;

  useEffect(() => {
    const container = scrollContainerRef.current;
    
    if (!container) return;
    
    const handleScroll = () => {
      if (!container) return;
      
      setShowLeftButton(container.scrollLeft > 0);
      setShowRightButton(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
    };
    
    container.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="new-arrivals" className="py-20 bg-secondary">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">New Arrivals</h2>
            <p className="text-muted-foreground">
              The latest additions to our collection
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              size="icon"
              variant="outline"
              className={!showLeftButton ? 'opacity-50 cursor-not-allowed' : ''}
              onClick={scrollLeft}
              disabled={!showLeftButton}
            >
              <ArrowLeft size={18} />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className={!showRightButton ? 'opacity-50 cursor-not-allowed' : ''}
              onClick={scrollRight}
              disabled={!showRightButton}
            >
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide py-6"
          style={{ scrollbarWidth: 'none' }}
        >
          <div className="flex space-x-6" style={{ width: 'max-content' }}>
            {products.map((product, index) => (
              <div
                key={product.id}
                className="w-[300px] flex-shrink-0 bg-card rounded-lg overflow-hidden shadow-lg transition-all hover:scale-[1.02] duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-xl">{product.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-primary font-bold">{product.price}</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalScroll;
