
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CartDrawer = ({ isOpen, setIsOpen }: CartDrawerProps) => {
  // Sample cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Minimalist Watch',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      quantity: 1
    },
    {
      id: '2',
      name: 'Premium Headphones',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      quantity: 1
    },
    {
      id: '3',
      name: 'Wireless Earbuds',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb',
      quantity: 1
    }
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={cn(
      "fixed inset-0 z-50 transition-all duration-500",
      isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    )}>
      <div 
        className="absolute inset-0 bg-black/60"
        onClick={() => setIsOpen(false)}
      />
      <div className={cn(
        "absolute top-0 right-0 h-full w-full sm:max-w-md bg-background p-6 shadow-xl transform transition-transform duration-500 flex flex-col",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold flex items-center">
            <ShoppingBag className="mr-2" size={20} />
            Your Cart
          </h2>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-secondary rounded-full">
            <X size={20} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <ShoppingBag size={64} className="mb-4 opacity-30" />
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex border-b border-border pb-4">
                  <div className="w-20 h-20 bg-secondary rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-primary font-semibold mt-1">${item.price.toFixed(2)}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 rounded hover:bg-secondary"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 rounded hover:bg-secondary"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex justify-between mb-4">
                <span>Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <Button className="w-full mb-2">Checkout Now</Button>
              <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
