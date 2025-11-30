import { motion } from "framer-motion";
import { Shield, Clock, Award, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Fully Compliant",
    description: "Registered with UIF, COID, and tax clearance. Ready for government tenders and corporate contracts."
  },
  {
    icon: Clock,
    title: "Reliable & Punctual",
    description: "We show up on time, every time. Consistent service you can depend on for your business or home."
  },
  {
    icon: Award,
    title: "Professional Standards",
    description: "Trained staff using industry-leading techniques and equipment. Quality guaranteed on every job."
  },
  {
    icon: Users,
    title: "Customer Focused",
    description: "Tailored cleaning solutions that fit your schedule and budget. Your satisfaction is our priority."
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional cleaning services backed by experience, reliability, and commitment to excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-4 w-16 h-16 rounded-full bg-gradient-hero mx-auto flex items-center justify-center shadow-custom-accent">
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
