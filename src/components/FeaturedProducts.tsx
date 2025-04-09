import { useState, useEffect, useRef } from 'react';
import { useInView } from '@/hooks/useInView';
import { getFeaturedProducts } from '@/data/products';
import ProductCard from './ProductCard';
import { useQuery } from '@tanstack/react-query';
import * as api from '@/api/apiClient';

const FeaturedProducts = () => {
  const [products, setProducts] = useState(getFeaturedProducts());
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });
  
  const { data, isError } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: api.getFeaturedProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    retryDelay: 1000,
  });

  useEffect(() => {
    if (data?.data && !isError) {
      setProducts(data.data);
    }
  }, [data, isError]);
  
  return (
    <section id="featured" className="py-20 px-4" ref={ref}>
      <div className="container max-w-7xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products designed for those who appreciate quality and style.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className={`transition-all duration-700 delay-${index * 100} ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
