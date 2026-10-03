// Daylight is local-first and does not ship with a remote analytics provider.
// This small hook gives a provider or an automated test one stable integration point.
export function trackEvent(name, properties = {}) {
  if (typeof window === "undefined") return;

  const detail = {
    name,
    ...properties,
    at: Date.now(),
  };

  try {
    window.dispatchEvent(new CustomEvent("daylight:analytics", { detail }));
  } catch {
    // CustomEvent can be unavailable in a few embedded webviews. Analytics are optional.
  }

  try {
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...properties });
    }
    if (typeof window.daylightAnalytics === "function") {
      window.daylightAnalytics(name, properties);
    }
  } catch {
    // A broken analytics adapter should never interrupt the onboarding flow.
  }
}
