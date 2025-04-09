
import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import HorizontalScroll from '@/components/HorizontalScroll';
import ParallaxSection from '@/components/ParallaxSection';
import Footer from '@/components/Footer';

const Index = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <main className="bg-background text-foreground min-h-screen" ref={scrollContainerRef}>
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <HorizontalScroll />
      <ParallaxSection />
      <Footer />
    </main>
  );
};

export default Index;
