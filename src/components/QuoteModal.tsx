import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Send, Upload, Image, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const services = [
  { id: "office", name: "Office Cleaning" },
  { id: "residential", name: "Residential / Home Cleaning" },
  { id: "airbnb", name: "Airbnb & Short-Term Rental" },
  { id: "retail", name: "Shopping Malls & Retail" },
  { id: "schools", name: "Schools & Universities" },
  { id: "medical", name: "Hospitals & Medical" },
  { id: "government", name: "Government Buildings" },
  { id: "construction", name: "Post-Construction Cleaning" },
  { id: "industrial", name: "Industrial & Warehouse" },
  { id: "moveinout", name: "Move-In / Move-Out Cleaning" },
];

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [preferredContact, setPreferredContact] = useState<"whatsapp" | "email">("whatsapp");
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).slice(0, 5 - uploadedImages.length);
    
    newFiles.forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Each image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreviews((prev) => [...prev, event.target?.result as string]);
      };
      reader.readAsDataURL(file);
      setUploadedImages((prev) => [...prev, file]);
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const convertImagesToBase64 = async (): Promise<string[]> => {
    const base64Images: string[] = [];
    for (const file of uploadedImages) {
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
      base64Images.push(base64);
    }
    return base64Images;
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and phone number.",
        variant: "destructive",
      });
      return;
    }

    if (preferredContact === "email" && !formData.email.trim()) {
      toast({
        title: "Email Required",
        description: "Please provide your email address for email contact.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const selectedServiceNames = services
      .filter((s) => selectedServices.includes(s.id))
      .map((s) => s.name);

    try {
      // Convert images to base64
      const base64Images = await convertImagesToBase64();

      // Send email via edge function
      const { data, error } = await supabase.functions.invoke("send-quote-email", {
        body: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          location: formData.location,
          message: formData.message,
          services: selectedServiceNames,
          preferredContact,
          images: base64Images,
        },
      });

      if (error) {
        throw error;
      }

      console.log("Quote email sent successfully:", data);
      setStep(3);
    } catch (error: any) {
      console.error("Error sending quote:", error);
      toast({
        title: "Error Sending Quote",
        description: "There was a problem sending your quote request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedServices([]);
    setUploadedImages([]);
    setImagePreviews([]);
    setPreferredContact("whatsapp");
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
              {/* Step 1: Service Selection & Image Upload */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-3">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        onClick={() => handleServiceToggle(service.id)}
                        className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
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
                      </div>
                    ))}
                  </div>

                  {/* Image Upload Section */}
                  <div className="border-t border-border pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Image className="w-5 h-5 text-accent" />
                      <h3 className="font-semibold text-foreground">Upload Photos (Optional)</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Share photos of the area that needs cleaning to help us provide an accurate quote.
                    </p>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    
                    <div className="flex flex-wrap gap-3">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Upload ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg border border-border"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      
                      {uploadedImages.length < 5 && (
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="w-20 h-20 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-1 hover:border-accent/50 transition-colors"
                        >
                          <Upload className="w-5 h-5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Add</span>
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Max 5 photos, 5MB each
                    </p>
                  </div>

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
                      Email {preferredContact === "email" ? "*" : "(optional)"}
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

                  {/* Communication Preference */}
                  <div className="border-t border-border pt-4">
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Preferred Contact Method *
                    </label>
                    <RadioGroup
                      value={preferredContact}
                      onValueChange={(value) => setPreferredContact(value as "whatsapp" | "email")}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="whatsapp" id="whatsapp" />
                        <Label htmlFor="whatsapp" className="flex items-center gap-2 cursor-pointer">
                          <MessageCircle className="w-4 h-4 text-green-500" />
                          WhatsApp
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="email" />
                        <Label htmlFor="email" className="flex items-center gap-2 cursor-pointer">
                          <Mail className="w-4 h-4 text-blue-500" />
                          Email
                        </Label>
                      </div>
                    </RadioGroup>
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
                      {isSubmitting ? "Sending..." : "Submit Quote Request"}
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
                    Thank you for your interest. We'll review your request and contact you via {preferredContact === "whatsapp" ? "WhatsApp" : "email"} shortly with a customized quote.
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
