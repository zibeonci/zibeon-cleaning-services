import { useState, useRef } from "react";
import { motion } from "framer-motion";
import beforeOffice from "@/assets/before-office.jpg";
import afterOffice from "@/assets/after-office.jpg";
import beforeKitchen from "@/assets/before-kitchen.jpg";
import afterKitchen from "@/assets/after-kitchen.jpg";
import beforeAirbnb from "@/assets/before-airbnb.jpg";
import afterAirbnb from "@/assets/after-airbnb.jpg";

interface ComparisonItem {
  id: number;
  title: string;
  service: string;
  beforeImage: string;
  afterImage: string;
}

const comparisons: ComparisonItem[] = [
  {
    id: 1,
    title: "Office Deep Clean",
    service: "Commercial Cleaning",
    beforeImage: beforeOffice,
    afterImage: afterOffice,
  },
  {
    id: 2,
    title: "Kitchen Restoration",
    service: "Residential Cleaning",
    beforeImage: beforeKitchen,
    afterImage: afterKitchen,
  },
  {
    id: 3,
    title: "Airbnb Turnover",
    service: "Short-term Rental",
    beforeImage: beforeAirbnb,
    afterImage: afterAirbnb,
  },
];

const ComparisonSlider = ({ item }: { item: ComparisonItem }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-custom-lg border border-border">
      <div
        ref={containerRef}
        className="relative h-64 sm:h-80 cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          <img
            src={item.afterImage}
            alt={`${item.title} - After`}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
            AFTER
          </div>
        </div>

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={item.beforeImage}
            alt={`${item.title} - Before`}
            className="w-full h-full object-cover"
            style={{ width: containerRef.current?.offsetWidth || "100%" }}
            draggable={false}
          />
          <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">
            BEFORE
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-4 bg-primary rounded-full" />
              <div className="w-0.5 h-4 bg-primary rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="p-4 bg-card">
        <h4 className="font-bold text-foreground">{item.title}</h4>
        <p className="text-sm text-muted-foreground">{item.service}</p>
      </div>
    </div>
  );
};

export const BeforeAfterGallery = () => {
  return (
    <section id="gallery" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            See the Difference
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Drag the slider to reveal our transformations. Real results from real Cape Town properties.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {comparisons.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ComparisonSlider item={item} />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-muted-foreground mt-10"
        >
          📸 These are example transformations. Your results may vary based on initial condition.
        </motion.p>
      </div>
    </section>
  );
};
