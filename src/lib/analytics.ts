// Google Analytics tracking utilities

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track button clicks
export const trackButtonClick = (buttonName: string) => {
  trackEvent("click", "Button", buttonName);
};

// Track form submissions
export const trackFormSubmission = (formName: string) => {
  trackEvent("submit", "Form", formName);
};

// Track outbound links
export const trackOutboundLink = (url: string) => {
  trackEvent("click", "Outbound Link", url);
};

// Track page views (for SPA navigation)
export const trackPageView = (path: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", "G-X787ERBZRG", {
      page_path: path,
    });
  }
};
