import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "./Button";
import { cn } from "../../lib/utils";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={cn(
        "fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 transition-all duration-300 ease-out",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-3 opacity-0 pointer-events-none"
      )}
    >
      <Button
        onClick={scrollToTop}
        size="sm"
        className="group h-10 w-10 sm:h-11 sm:w-11 p-0 flex items-center justify-center bg-primary-950/90 hover:bg-primary-900 text-gray-300 hover:text-white border border-white/15 hover:border-secondary/60 shadow-lg shadow-primary-950/40 backdrop-blur-md transition-all duration-200 cursor-pointer"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:-translate-y-0.5 text-secondary" />
      </Button>
    </div>
  );
}