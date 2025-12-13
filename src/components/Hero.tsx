import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-cleaning.jpg";

export const Hero = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/27630341790", "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden -mt-20 pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Professional cleaning team at work" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-10 h-10 text-accent" />
              <span className="text-accent font-bold text-3xl sm:text-4xl">Zibeon Cleaning Services</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Spotless Spaces,
              <br />
              <span className="text-accent">Every Time</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-primary-foreground/90 mb-10 leading-relaxed">
              From offices to homes, we deliver professional cleaning services that exceed expectations. Reliable, thorough, and tailored to your needs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={handleWhatsAppClick}
                className="text-lg px-8 py-6 bg-accent hover:bg-accent/90 text-accent-foreground shadow-custom-accent"
              >
                Get Free Quote
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-lg px-8 py-6 border-2 border-accent bg-accent/20 text-accent hover:bg-accent hover:text-accent-foreground"
              >
                View Services
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg className="w-full h-20" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 50C240 20 480 0 720 10C960 20 1200 40 1440 50V100H0V50Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};
