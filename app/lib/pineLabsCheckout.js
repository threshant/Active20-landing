const DEFAULT_SCRIPT =
  process.env.NEXT_PUBLIC_PINELABS_CHECKOUT_SCRIPT ||
  "https://checkout.pluralonline.com/v1/web-sdk.js";

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing && (window.Plural || window.PluralCheckout || window.PluralPG)) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Pine Labs checkout failed to load."));
    document.body.appendChild(script);
  });
}

export async function openPineLabsCheckout({
  orderId,
  redirectUrl,
  amount,
  currency = "INR",
  customer = {},
  onSuccess,
  onFailure,
}) {
  const checkoutUrl =
    redirectUrl ||
    (typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("redirect_url")
      : null);

  if (checkoutUrl && !window.Plural && !window.PluralCheckout && !window.PluralPG) {
    await loadScript(DEFAULT_SCRIPT).catch(() => false);
  } else {
    await loadScript(DEFAULT_SCRIPT).catch(() => false);
  }

  const options = {
    orderId,
    order_id: orderId,
    redirectUrl: checkoutUrl || undefined,
    redirect_url: checkoutUrl || undefined,
    amount,
    currency,
    theme: {
      backgroundColor: "#01111e",
      accentColor: "#e8fb76",
    },
    customer,
    successHandler: (response) => onSuccess?.(response),
    failedHandler: (response) => onFailure?.(response),
    onSuccess: (response) => onSuccess?.(response),
    onFailed: (response) => onFailure?.(response),
    onFailure: (response) => onFailure?.(response),
  };

  if (typeof window.Plural === "function") {
    const plural = new window.Plural(options);
    plural.open(options);
    return true;
  }

  if (typeof window.PluralCheckout === "function") {
    const checkout = new window.PluralCheckout(options);
    checkout.open(options);
    return true;
  }

  if (typeof window.PluralPG === "function") {
    const checkout = new window.PluralPG(options);
    checkout.open();
    return true;
  }

  if (checkoutUrl) {
    window.location.assign(checkoutUrl);
    return true;
  }

  return false;
}
