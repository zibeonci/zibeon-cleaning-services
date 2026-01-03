import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, MessageCircle, Calendar, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Quote {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  location: string | null;
  message: string | null;
  services: string[];
  preferred_contact: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQuotes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error loading quotes",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setQuotes(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("quotes")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setQuotes((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
      );
      toast({
        title: "Status updated",
        description: `Quote status changed to ${newStatus}`,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-700 border-yellow-500/30";
      case "contacted":
        return "bg-blue-500/20 text-blue-700 border-blue-500/30";
      case "quoted":
        return "bg-purple-500/20 text-purple-700 border-purple-500/30";
      case "completed":
        return "bg-green-500/20 text-green-700 border-green-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-700 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-700 border-gray-500/30";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quote Requests</h1>
            <p className="text-muted-foreground mt-1">
              Manage and respond to customer quote requests
            </p>
          </div>
          <Button onClick={fetchQuotes} variant="outline" disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading quotes...</div>
        ) : quotes.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No quote requests yet
          </div>
        ) : (
          <div className="grid gap-4">
            {quotes.map((quote) => (
              <Card key={quote.id} className="border border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {quote.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {formatDate(quote.created_at)}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusColor(quote.status)}>
                        {quote.status}
                      </Badge>
                      <Select
                        value={quote.status}
                        onValueChange={(value) => updateStatus(quote.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="quoted">Quoted</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a href={`tel:${quote.phone}`} className="text-foreground hover:text-accent">
                        {quote.phone}
                      </a>
                    </div>
                    {quote.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <a href={`mailto:${quote.email}`} className="text-foreground hover:text-accent">
                          {quote.email}
                        </a>
                      </div>
                    )}
                    {quote.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{quote.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">
                        Prefers: {quote.preferred_contact === "whatsapp" ? "WhatsApp" : "Email"}
                      </span>
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Services Requested:</p>
                    <div className="flex flex-wrap gap-2">
                      {quote.services.map((service, idx) => (
                        <Badge key={idx} variant="secondary">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  {quote.message && (
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-foreground mb-1">Additional Details:</p>
                      <p className="text-sm text-muted-foreground">{quote.message}</p>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" asChild>
                      <a
                        href={`https://wa.me/${quote.phone.replace(/\D/g, "")}?text=Hi ${quote.name}, thank you for your quote request!`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                    {quote.email && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={`mailto:${quote.email}?subject=Your Quote Request - Zibeon Cleaning Services`}>
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </a>
                      </Button>
                    )}
                    <Button size="sm" variant="outline" asChild>
                      <a href={`tel:${quote.phone}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
