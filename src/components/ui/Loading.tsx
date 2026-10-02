import { useTranslation } from "react-i18next";
import { cn } from "../../lib/utils";
import { Text } from "./Text";
import Logo from "../../assets/logo.png";

export function Loading({ className }: { className?: string }) {
  const { t } = useTranslation("common");

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex min-h-[60vh] w-full flex-col items-center justify-center bg-gray-50",
        className
      )}
    >
      <div className="flex flex-col items-center gap-4">
        
        <div className="relative flex items-center justify-center w-12 h-12 select-none">
          <img
            src={Logo}
            alt="Loading"
            className="w-full h-full object-contain animate-spin [animation-duration:2s] drop-shadow-xs"
          />
        </div>

        <Text className="text-xs font-semibold tracking-[0.22em] text-primary-950 uppercase font-sans">
          {t("loading.message", "Loading...")}
        </Text>

        <span className="sr-only">Loading page content</span>
      </div>
    </div>
  );
}