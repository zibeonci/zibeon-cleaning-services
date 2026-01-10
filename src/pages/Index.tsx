import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { QuoteModal } from "@/components/QuoteModal";

const Index = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Navbar onGetQuote={() => setIsQuoteModalOpen(true)} />
      <Hero onGetQuote={() => setIsQuoteModalOpen(true)} />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <Contact onGetQuote={() => setIsQuoteModalOpen(true)} />
      <Footer />
      <WhatsAppButton />
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </main>
  );
};

export default Index;
