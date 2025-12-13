import { motion } from "framer-motion";
import { Star, Quote, MapPin } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "Sea Point",
    type: "Residential",
    rating: 5,
    review: "Zibeon Cleaning has been cleaning my apartment for 6 months now. They're always on time, thorough, and my place has never looked better. Highly recommend!",
  },
  {
    name: "Michael van der Berg",
    location: "V&A Waterfront",
    type: "Office Cleaning",
    rating: 5,
    review: "Our office at the Waterfront sparkles every morning. The team is professional, discreet, and incredibly reliable. Best cleaning service we've used.",
  },
  {
    name: "Thandi Nkosi",
    location: "Century City",
    type: "Office Cleaning",
    rating: 5,
    review: "We manage a large corporate office and Zibeon handles everything perfectly. From daily cleaning to deep cleans, they exceed expectations every time.",
  },
  {
    name: "James Peterson",
    location: "Tableview",
    type: "Airbnb",
    rating: 5,
    review: "I run 3 Airbnb properties and Zibeon is my go-to cleaning team. Quick turnovers, spotless results, and my guests always comment on how clean everything is!",
  },
  {
    name: "Fatima Adams",
    location: "Milnerton",
    type: "Residential",
    rating: 5,
    review: "After trying many cleaning services, I finally found Zibeon. They treat my home with care and attention to detail. My family is so happy with the results.",
  },
  {
    name: "David Chen",
    location: "Cape Town CBD",
    type: "Office Cleaning",
    rating: 5,
    review: "Our law firm requires impeccable cleanliness. Zibeon delivers consistently. Professional team, great communication, and outstanding results.",
  },
  {
    name: "Lisa Thompson",
    location: "Sea Point",
    type: "Airbnb",
    rating: 5,
    review: "Managing holiday rentals requires reliable cleaners. Zibeon never lets me down - even with last-minute bookings. Five stars all the way!",
  },
  {
    name: "Pieter Joubert",
    location: "Century City",
    type: "Residential",
    rating: 5,
    review: "The team is friendly, efficient, and always goes the extra mile. My home feels fresh and welcoming after every visit. Couldn't ask for better service.",
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by homes, offices, and Airbnb hosts across Cape Town
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow duration-300"
            >
              <Quote className="w-8 h-8 text-accent mb-4" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                "{testimonial.review}"
              </p>

              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>{testimonial.location}</span>
                  <span className="mx-1">•</span>
                  <span className="text-accent font-medium">{testimonial.type}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-muted-foreground">
            Serving <span className="text-accent font-semibold">Sea Point</span>, <span className="text-accent font-semibold">V&A Waterfront</span>, <span className="text-accent font-semibold">Tableview</span>, <span className="text-accent font-semibold">Milnerton</span>, <span className="text-accent font-semibold">Century City</span>, <span className="text-accent font-semibold">Cape Town CBD</span> and surrounding areas
          </p>
        </motion.div>
      </div>
    </section>
  );
};
