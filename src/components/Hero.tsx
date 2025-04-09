
import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingBag } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      if (imageRef.current) {
        // Parallax effect for the image
        imageRef.current.style.transform = `translateY(${scrollPosition * 0.2}px)`;
      }
      
      if (titleRef.current) {
        // Fade out the title on scroll
        titleRef.current.style.opacity = `${1 - scrollPosition * 0.003}`;
        titleRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="top" className="relative h-screen overflow-hidden" ref={heroRef}>
      <div 
        ref={imageRef}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/80 to-background"></div>
        <img 
          src="https://images.unsplash.com/photo-1579353977828-2a4eab540b9a" 
          alt="Premium Headphones" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full container px-4">
        <h1 
          ref={titleRef}
          className="text-center text-5xl md:text-7xl font-bold mb-6 max-w-4xl leading-tight"
        >
          Experience Sound <span className="text-primary">Reimagined</span>
        </h1>
        <p className="text-center text-lg md:text-xl mb-8 max-w-2xl text-muted-foreground">
          Discover our new collection of premium audio devices designed to transform the way you experience sound.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="animate-pulse-light">
            <ShoppingBag className="mr-2" size={16} />
            Shop Now
          </Button>
          <Button size="lg" variant="outline">
            Explore Collection
          </Button>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <p className="text-sm text-muted-foreground mb-2 text-center">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full mx-auto flex justify-center">
            <div className="w-1.5 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
