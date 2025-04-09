
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CartDrawer = ({ isOpen, setIsOpen }: CartDrawerProps) => {
  const { cartItems, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();

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
                <div key={item.id} className="flex border-b border-border pb-4 animate-fade-in">
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
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded hover:bg-secondary"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded hover:bg-secondary"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
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
              <Link to="/checkout">
                <Button className="w-full mb-2" onClick={() => setIsOpen(false)}>
                  Checkout Now
                </Button>
              </Link>
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
