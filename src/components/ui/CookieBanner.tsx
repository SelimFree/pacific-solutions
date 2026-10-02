import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import { Text } from "./Text";
import { cn } from "../../lib/utils";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation("common");

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const dismissBanner = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isVisible ? "translate-y-0" : "translate-y-full pointer-events-none"
      )}
      role="region"
      aria-label="Cookie consent banner"
    >
      <div className="bg-primary-950/95 backdrop-blur-md border-t border-white/10 shadow-2xl p-4 sm:p-5 w-full">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
          
          <div className="flex items-center gap-4 flex-1">
            <div className="w-10 h-10 rounded-xs bg-white/5 border border-white/10 hidden sm:flex items-center justify-center shrink-0 text-secondary">
              <Cookie className="h-5 w-5" strokeWidth={1.75} />
            </div>

            <div className="space-y-1">
              <Text className="text-white text-xs font-bold tracking-wider uppercase">
                {t("cookieBanner.title")}
              </Text>
              <Text className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
                {t("cookieBanner.body")}
              </Text>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
            <Link
              to="/cookies"
              onClick={dismissBanner}
              className="text-xs font-semibold text-gray-400 hover:text-white underline underline-offset-4 tracking-wide transition-colors whitespace-nowrap"
            >
              {t("cookieBanner.more")}
            </Link>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={acceptCookies}
                className="h-9 sm:h-10 px-5 sm:px-6 bg-primary-700 hover:bg-primary-600 text-white font-semibold text-xs tracking-wider uppercase cursor-pointer border border-primary-500/40 shadow-sm transition-all"
              >
                {t("cookieBanner.accept")}
              </Button>

              <button
                onClick={dismissBanner}
                className="p-2 text-gray-400 hover:text-white transition-colors cursor-pointer rounded-xs"
                aria-label="Dismiss cookie notice"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}