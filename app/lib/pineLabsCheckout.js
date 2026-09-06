const PRODUCTION_SCRIPT = "https://checkout.pluralonline.com/v1/web-sdk-checkout.js";
const STAGING_SCRIPT =
  "https://checkout-staging.pluralonline.com/v1/web-sdk-checkout.js";

function resolveScriptSrc(redirectUrl = "") {
  if (process.env.NEXT_PUBLIC_PINELABS_CHECKOUT_SCRIPT) {
    return process.env.NEXT_PUBLIC_PINELABS_CHECKOUT_SCRIPT;
  }

  const isStaging =
    redirectUrl.includes("pluraluat") ||
    redirectUrl.includes("staging") ||
    redirectUrl.includes("checkout-staging");

  return isStaging ? STAGING_SCRIPT : PRODUCTION_SCRIPT;
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (typeof window.Plural === "function") {
      resolve(true);
      return;
    }

    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(true), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Pine Labs checkout failed to load.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () =>
      reject(new Error("Pine Labs checkout failed to load."));
    document.body.appendChild(script);
  });
}

export async function openPineLabsCheckout({
  redirectUrl,
  checkoutToken,
  onTransactionResponse,
  onCancelTxn,
  onErrorOccured,
}) {
  if (!redirectUrl) {
    throw new Error("Pine Labs redirect_url is missing.");
  }

  await loadScript(resolveScriptSrc(redirectUrl));

  if (typeof window.Plural !== "function") {
    throw new Error("Pine Labs Web SDK did not initialize.");
  }

  const options = {
    redirectUrl,
    token: checkoutToken,
    onTransactionResponse: (response) => {
      onTransactionResponse?.(response);
    },
    onCancelTxn: (response) => {
      onCancelTxn?.(response);
    },
    onErrorOccured: (response) => {
      onErrorOccured?.(response);
    },
    successHandler: (response) => {
      onTransactionResponse?.(response);
    },
    failedHandler: (response) => {
      onCancelTxn?.(response);
    },
  };

  const plural = new window.Plural(options);
  plural.open(options);
  return true;
}
