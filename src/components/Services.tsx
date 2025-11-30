import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  Building2, 
  Home, 
  Key, 
  ShoppingBag, 
  GraduationCap, 
  Cross,
  Landmark,
  HardHat,
  Factory,
  Car,
  UtensilsCrossed,
  ClipboardCheck
} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Office Cleaning",
    description: "Professional cleaning for corporate offices and small businesses. Daily or weekly service for desks, floors, bathrooms, and common areas.",
    keywords: "Corporate cleaning, office hygiene"
  },
  {
    icon: Home,
    title: "Residential Cleaning",
    description: "Complete home cleaning services including rooms, bathrooms, kitchens, and dusting. Keep your home spotless and fresh.",
    keywords: "House cleaning, home maintenance"
  },
  {
    icon: Key,
    title: "Airbnb Cleaning",
    description: "Fast turnaround cleaning between guests. Bed making, restocking essentials, and ensuring 5-star guest experiences.",
    keywords: "Short-term rental cleaning"
  },
  {
    icon: ShoppingBag,
    title: "Retail & Mall Cleaning",
    description: "Floor cleaning, glass polishing, and trash removal for retail stores and shopping centers. Maintain a pristine shopping environment.",
    keywords: "Store cleaning, mall maintenance"
  },
  {
    icon: GraduationCap,
    title: "Schools & Universities",
    description: "After-hours cleaning for classrooms, bathrooms, corridors, and common areas. Safe and hygienic learning environments.",
    keywords: "Educational facility cleaning"
  },
  {
    icon: Cross,
    title: "Medical Facilities",
    description: "Specialized cleaning for hospitals, clinics, and medical offices. Strong hygiene standards with proper PPE and protocols.",
    keywords: "Healthcare cleaning, hospital hygiene"
  },
  {
    icon: Landmark,
    title: "Government Buildings",
    description: "Compliant cleaning services for municipal offices and government facilities. Fully registered with UIF, COID, and tax clearance.",
    keywords: "Tender cleaning, government contracts"
  },
  {
    icon: HardHat,
    title: "Construction Cleaning",
    description: "Post-construction cleanup including rubble removal, dust cleaning, window washing, and floor treatment.",
    keywords: "Builder cleaning, site cleanup"
  },
  {
    icon: Factory,
    title: "Industrial Cleaning",
    description: "Warehouse and industrial facility cleaning. Floor sweeping, debris removal, and staff area maintenance.",
    keywords: "Warehouse cleaning, factory maintenance"
  },
  {
    icon: Car,
    title: "Car Dealerships",
    description: "Showroom cleaning with focus on shiny floors, spotless windows, and high-visibility areas to showcase vehicles.",
    keywords: "Dealership cleaning, showroom maintenance"
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurant Cleaning",
    description: "Deep cleaning for dining areas, floors, and bathrooms. Maintain food safety standards and pristine guest areas.",
    keywords: "Food industry cleaning, restaurant hygiene"
  },
  {
    icon: ClipboardCheck,
    title: "Move-In/Out Cleaning",
    description: "Complete property refresh for estate agents. Walls, windows, floors, and cupboards cleaned to perfection.",
    keywords: "Property cleaning, handover cleaning"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Our Cleaning Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive cleaning solutions for every space and industry. Professional, reliable, and tailored to your specific needs.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={index} variants={item}>
                <Card className="p-6 h-full hover:shadow-custom-lg transition-all duration-300 hover:-translate-y-1 border-border bg-card group">
                  <div className="mb-4 w-14 h-14 rounded-xl bg-gradient-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-3 leading-relaxed">
                    {service.description}
                  </p>
                  <p className="text-sm text-accent font-medium">
                    {service.keywords}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
