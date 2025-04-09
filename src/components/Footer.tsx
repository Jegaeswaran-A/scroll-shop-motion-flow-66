
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground pt-16 pb-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4">LUXE</h3>
            <p className="text-muted-foreground mb-6">
              Premium products for the modern lifestyle. Quality that speaks for itself.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Featured Products</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Best Sellers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Special Offers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Coming Soon</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Information</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to get special offers, free giveaways, and latest news.
            </p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="rounded-r-none"
              />
              <Button className="rounded-l-none">
                Subscribe
              </Button>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                <Mail size={16} className="mr-2" />
                <span>support@luxe.com</span>
              </div>
              <div className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                <Phone size={16} className="mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                <MapPin size={16} className="mr-2" />
                <span>123 Fashion St, Design City</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © 2025 LUXE. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <img src="https://via.placeholder.com/40x25/3b7bbf/FFFFFF?text=VISA" alt="Visa" className="h-6" />
            <img src="https://via.placeholder.com/40x25/2a2a2a/FFFFFF?text=MC" alt="MasterCard" className="h-6" />
            <img src="https://via.placeholder.com/40x25/079de7/FFFFFF?text=PP" alt="PayPal" className="h-6" />
            <img src="https://via.placeholder.com/40x25/ff9900/FFFFFF?text=AMEX" alt="American Express" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
