import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Phone } from "lucide-react";

export const Contact = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/2767149373", "_blank");
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:zibeonricardo@gmail.com";
  };

  return (
    <section id="contact" className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-6">
            Ready for a Spotless Space?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-12 leading-relaxed">
            Get in touch today for a free quote. We're here to answer your questions and provide the perfect cleaning solution for your needs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20"
            >
              <MessageCircle className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary-foreground mb-2">WhatsApp</h3>
              <p className="text-primary-foreground/80 mb-4">Chat with us instantly</p>
              <Button 
                onClick={handleWhatsAppClick}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Message Us
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20"
            >
              <Mail className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-primary-foreground mb-2">Email</h3>
              <p className="text-primary-foreground/80 mb-4">Send us a message</p>
              <Button 
                onClick={handleEmailClick}
                variant="outline"
                className="w-full border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Email Us
              </Button>
            </motion.div>
          </div>

          <div className="flex items-center justify-center gap-2 text-primary-foreground/90">
            <Phone className="w-5 h-5" />
            <a href="tel:0767149373" className="text-lg hover:text-accent transition-colors">
              076 714 9373
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
