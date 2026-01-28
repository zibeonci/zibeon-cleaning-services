import { motion } from "framer-motion";

const clients = [
  { name: "V&A Waterfront", type: "Commercial" },
  { name: "Clicks Group", type: "Retail" },
  { name: "Cape Town CBD Offices", type: "Corporate" },
  { name: "Airbnb Superhost Properties", type: "Short-term Rentals" },
  { name: "Century City Medical", type: "Healthcare" },
  { name: "Table Bay Hotels", type: "Hospitality" },
];

export const ClientLogos = () => {
  return (
    <section className="py-12 bg-muted/50 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Trusted by Leading Cape Town Businesses
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center"
        >
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center p-4 rounded-lg bg-background/60 border border-border/50 hover:border-primary/30 hover:shadow-sm transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                <span className="text-primary-foreground font-bold text-lg">
                  {client.name.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-medium text-foreground text-center leading-tight">
                {client.name}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                {client.type}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-muted-foreground text-sm mt-8"
        >
          Join <span className="font-semibold text-primary">500+</span> satisfied clients across Cape Town
        </motion.p>
      </div>
    </section>
  );
};
