
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CartDrawer from './CartDrawer';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 p-4",
        isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
      )}>
        <div className="container max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold">LUXE</Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/#featured" className="hover:text-primary transition-colors">Featured</Link>
            <Link to="/#new-arrivals" className="hover:text-primary transition-colors">New Arrivals</Link>
            <Link to="/#collections" className="hover:text-primary transition-colors">Collections</Link>
            <Link to="/order-tracking" className="hover:text-primary transition-colors">Track Order</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="hover:text-primary transition-colors">
              <Search size={20} />
            </button>
            <button className="hover:text-primary transition-colors relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs animate-scale-in">
                  {itemCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md p-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/#featured" className="hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Featured</Link>
              <Link to="/#new-arrivals" className="hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>New Arrivals</Link>
              <Link to="/#collections" className="hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Collections</Link>
              <Link to="/order-tracking" className="hover:text-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Track Order</Link>
            </div>
          </div>
        )}
      </nav>
      
      <CartDrawer isOpen={isCartOpen} setIsOpen={setIsCartOpen} />
    </>
  );
};

export default Navbar;
