import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useQuery } from '@tanstack/react-query';
import * as api from '@/api/apiClient';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const { data: apiData, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => id ? api.getProductById(id) : Promise.reject('No ID provided'),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    retryDelay: 1000,
    enabled: !!id,
  });

  const fallbackProduct = id ? getProductById(id) : undefined;
  const product = apiData?.data && !isError ? apiData.data : fallbackProduct;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container max-w-7xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-8" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative overflow-hidden rounded-lg bg-gray-100">
              <div className={`absolute inset-0 bg-gray-200 animate-pulse ${isImageLoaded ? 'hidden' : 'block'}`}></div>
              <img 
                src={product.image} 
                alt={product.name} 
                className={`w-full h-full object-cover ${isImageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                onLoad={() => setIsImageLoaded(true)}
              />
            </div>
            
            <div className="animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
              <p className="text-primary text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
              
              <div className="mt-6">
                <p className="text-muted-foreground">{product.description}</p>
              </div>
              
              <div className="mt-8">
                <div className="flex items-center mb-6">
                  <span className="mr-4">Quantity</span>
                  <div className="flex items-center border border-input rounded-md">
                    <button 
                      className="p-2" 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button 
                      className="p-2" 
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full md:w-auto"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
              
              <div className="mt-12 border-t border-border pt-4">
                <h3 className="font-semibold mb-2">Product Details</h3>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Premium quality materials</li>
                  <li>Designed for everyday use</li>
                  <li>1 year warranty</li>
                  <li>Free shipping on orders over $50</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
