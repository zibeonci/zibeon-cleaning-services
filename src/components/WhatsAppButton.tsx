import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { openWhatsAppChat } from "@/lib/whatsapp";

export const WhatsAppButton = () => {
  const handleClick = () => {
    openWhatsAppChat({ phone: "+27767149376" });
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-accent rounded-full shadow-custom-accent flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="w-8 h-8 text-accent-foreground group-hover:animate-pulse" />
      <span className="sr-only">Contact us on WhatsApp</span>
    </motion.button>
  );
};
