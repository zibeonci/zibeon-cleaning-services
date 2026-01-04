type OpenWhatsAppParams = {
  phone: string;
  text?: string;
};

export function openWhatsAppChat({ phone, text }: OpenWhatsAppParams) {
  const cleanPhone = phone.replace(/\D/g, "");
  const encodedText = text ? encodeURIComponent(text) : "";

  const schemeUrl = `whatsapp://send?phone=${cleanPhone}${text ? `&text=${encodedText}` : ""}`;
  const fallbackUrl = `https://wa.me/${cleanPhone}${text ? `?text=${encodedText}` : ""}`;

  const start = Date.now();

  // Try opening the native WhatsApp app first (avoids click-to-chat API blocks in some cases)
  window.location.href = schemeUrl;

  // If WhatsApp didn't open, fallback to the web endpoint
  window.setTimeout(() => {
    const stillVisible = document.visibilityState === "visible";
    const quickReturn = Date.now() - start < 2000;

    if (stillVisible && quickReturn) {
      window.open(fallbackUrl, "_blank", "noopener,noreferrer");
    }
  }, 900);
}
