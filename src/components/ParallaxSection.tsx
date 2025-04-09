
import { useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const ParallaxSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !imageRef.current || !contentRef.current) return;
      
      const scrollPosition = window.scrollY;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Check if section is in viewport
      if (
        scrollPosition + viewportHeight >= sectionTop &&
        scrollPosition <= sectionTop + sectionHeight
      ) {
        // Calculate how far we've scrolled into the section
        const scrollIntoSection = scrollPosition + viewportHeight - sectionTop;
        const scrollProgress = Math.min(scrollIntoSection / sectionHeight, 1);
        
        // Apply parallax effect
        imageRef.current.style.transform = `translateY(${scrollProgress * -80}px)`;
        contentRef.current.style.transform = `translateY(${scrollProgress * 80}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="collections" className="h-screen relative overflow-hidden" ref={sectionRef}>
      <div 
        ref={imageRef}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent"></div>
        <img 
          src="https://images.unsplash.com/photo-1600086827875-a63b01f1335c" 
          alt="Collection Background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 container h-full flex items-center">
        <div 
          ref={contentRef}
          className="max-w-lg"
        >
          <h2 className="text-5xl font-bold mb-6">Summer Collection</h2>
          <p className="text-lg mb-8 text-muted-foreground">
            Experience the perfect blend of style and functionality with our latest summer collection. 
            Designed for those who appreciate quality and attention to detail.
          </p>
          <Button size="lg">
            View Collection
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
