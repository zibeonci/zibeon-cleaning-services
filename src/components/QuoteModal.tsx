import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const services = [
  { id: "office", name: "Office Cleaning", price: "From R800/visit" },
  { id: "residential", name: "Residential / Home Cleaning", price: "From R500/visit" },
  { id: "airbnb", name: "Airbnb & Short-Term Rental", price: "From R350/turnover" },
  { id: "retail", name: "Shopping Malls & Retail", price: "Custom quote" },
  { id: "schools", name: "Schools & Universities", price: "Custom quote" },
  { id: "medical", name: "Hospitals & Medical", price: "Custom quote" },
  { id: "government", name: "Government Buildings", price: "Custom quote" },
  { id: "construction", name: "Post-Construction Cleaning", price: "From R1500/job" },
  { id: "industrial", name: "Industrial & Warehouse", price: "Custom quote" },
  { id: "dealership", name: "Car Dealership & Showroom", price: "From R1000/visit" },
  { id: "restaurant", name: "Restaurant Deep Cleaning", price: "From R1200/visit" },
  { id: "moveinout", name: "Move-In / Move-Out Cleaning", price: "From R800/property" },
];

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and phone number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Build WhatsApp message
    const selectedServiceNames = services
      .filter((s) => selectedServices.includes(s.id))
      .map((s) => s.name)
      .join(", ");

    const message = `Hi Zibeon Cleaning Services!

I'd like to request a quote.

*Name:* ${formData.name}
*Phone:* ${formData.phone}
${formData.email ? `*Email:* ${formData.email}` : ""}
*Location:* ${formData.location || "Not specified"}

*Services Needed:*
${selectedServiceNames || "General inquiry"}

${formData.message ? `*Additional Details:*\n${formData.message}` : ""}

Please contact me with a quote. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/2767149373?text=${encodedMessage}`, "_blank");

    setIsSubmitting(false);
    setStep(3);
  };

  const resetForm = () => {
    setStep(1);
    setSelectedServices([]);
    setFormData({
      name: "",
      phone: "",
      email: "",
      location: "",
      message: "",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {step === 1 && "Select Services"}
                  {step === 2 && "Your Details"}
                  {step === 3 && "Quote Requested!"}
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  {step === 1 && "Choose the services you need"}
                  {step === 2 && "Tell us how to reach you"}
                  {step === 3 && "We'll be in touch soon"}
                </p>
              </div>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Step 1: Service Selection */}
              {step === 1 && (
                <div className="space-y-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => handleServiceToggle(service.id)}
                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedServices.includes(service.id)
                          ? "border-accent bg-accent/10"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedServices.includes(service.id)}
                          onCheckedChange={() => handleServiceToggle(service.id)}
                        />
                        <span className="font-medium text-foreground">
                          {service.name}
                        </span>
                      </div>
                      <span className="text-sm text-accent font-semibold">
                        {service.price}
                      </span>
                    </div>
                  ))}

                  <Button
                    onClick={() => setStep(2)}
                    className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground"
                    size="lg"
                  >
                    Continue
                  </Button>
                </div>
              )}

              {/* Step 2: Contact Details */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Your Name *
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Smith"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number *
                    </label>
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="076 123 4567"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email (optional)
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Location / Area
                    </label>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g. Sea Point, Cape Town"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Additional Details
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your cleaning needs..."
                      className="w-full min-h-[100px]"
                    />
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="flex-1"
                      size="lg"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                      size="lg"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send via WhatsApp
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Success */}
              {step === 3 && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    Quote Request Sent!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for your interest. We'll review your request and get back to you shortly with a customized quote.
                  </p>
                  <Button
                    onClick={resetForm}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    size="lg"
                  >
                    Close
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
