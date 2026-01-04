import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuoteEmailRequest {
  name: string;
  phone: string;
  email: string;
  location: string;
  message: string;
  services: string[];
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received request to send quote email");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: QuoteEmailRequest = await req.json();
    console.log("Quote request data received:", {
      name: requestData.name,
      phone: requestData.phone,
      email: requestData.email,
      location: requestData.location,
      services: requestData.services,
    });

    // Build email content
    const servicesHtml = requestData.services.length > 0
      ? requestData.services.map(s => `<li>${s}</li>`).join("")
      : "<li>General inquiry</li>";

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          New Quote Request
        </h1>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #374151; margin-top: 0;">Customer Details</h2>
          <p><strong>Name:</strong> ${requestData.name}</p>
          <p><strong>Phone:</strong> ${requestData.phone}</p>
          <p><strong>Email:</strong> ${requestData.email || "Not provided"}</p>
          <p><strong>Location:</strong> ${requestData.location || "Not specified"}</p>
        </div>
        
        <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h2 style="color: #1e40af; margin-top: 0;">Services Requested</h2>
          <ul style="margin: 0; padding-left: 20px;">
            ${servicesHtml}
          </ul>
        </div>
        
        ${requestData.message ? `
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #92400e; margin-top: 0;">Additional Details</h2>
            <p style="margin: 0;">${requestData.message}</p>
          </div>
        ` : ""}
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        <p style="color: #6b7280; font-size: 12px;">
          This quote request was submitted via the Zibeon Cleaning Services website.
        </p>
      </div>
    `;

    // Send to Gmail address (no domain verification needed)
    console.log("Sending email to zibeonricardo@gmail.com");

    const emailResponse = await resend.emails.send({
      from: "Zibeon Cleaning Services <onboarding@resend.dev>",
      to: ["zibeonricardo@gmail.com"],
      subject: `New Quote Request from ${requestData.name}`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-quote-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
