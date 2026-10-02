import { forwardRef, type ComponentProps, useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";
import type { NavLinkItem } from "./Layout";
import { Image } from "../ui/Image";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { useTranslation } from "react-i18next";

import RgLogo from "../../assets/logo.png";

export interface NavbarProps extends ComponentProps<"header"> {
  links: NavLinkItem[];
}

export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ links, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation("common");
    const location = useLocation();

    useEffect(() => {
      setIsOpen(false);
    }, [location.pathname]);

    const navItemClasses = ({ isActive }: { isActive: boolean }) =>
      cn(
        "group relative py-6 flex items-center text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors duration-200",
        isActive ? "text-primary-950" : "text-gray-600 hover:text-primary-800"
      );

    const mobileNavItemClasses = ({ isActive }: { isActive: boolean }) =>
      cn(
        "block w-full px-4 py-3.5 text-xs font-bold tracking-wider uppercase transition-all duration-200 rounded-none border-b border-gray-100 last:border-0",
        isActive
          ? "bg-primary-50 text-primary-950 border-l-4 border-l-secondary"
          : "text-gray-600 border-l-4 border-l-transparent hover:bg-gray-50 hover:text-primary-950"
      );

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all h-20 shadow-xs",
          className
        )}
        {...props}
      >
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          <div className="relative flex items-center h-full">
            <Link
              to="/"
              className="relative z-10 flex items-center gap-3 outline-none group py-2"
            >
              <div className="shrink-0 transition-transform duration-300 group-hover:scale-105 flex items-center">
                <Image
                  src={RgLogo}
                  aspectRatio="auto"
                  alt={t("navbar.logoAlt")}
                  className="h-9 sm:h-10 md:h-11 w-auto object-contain"
                  containerClassName="flex items-center bg-transparent border-none outline-none ring-0"
                />
              </div>

              <div className="flex flex-col justify-center select-none">
                <span className="text-base sm:text-lg font-extrabold tracking-wider text-primary-950 uppercase leading-none font-sans">
                  PACIFIC
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-primary-700 uppercase leading-none mt-1 font-sans">
                  SOLUTIONS
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden flex-1 items-stretch justify-end gap-8 px-8 md:flex h-full">
            {links.map((link) => (
              <NavLink key={link.href} to={link.href} className={navItemClasses}>
                {({ isActive }) => (
                  <>
                    {t(`navbar.${link.label}`)}
                    <span
                      className={cn(
                        "absolute bottom-0 left-0 h-0.5 bg-secondary transition-all duration-300 origin-left",
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex h-full items-center gap-3 md:gap-4 ml-2 md:ml-0">
            <LanguageSwitcher />

            <Button
              variant="ghost"
              size="sm"
              className="relative h-10 w-10 p-0 flex items-center justify-center text-primary-950 hover:bg-gray-100 md:hidden rounded-sm cursor-pointer outline-none border-none ring-0"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <div className="relative h-6 w-6 flex items-center justify-center">
                <Menu
                  className={cn(
                    "absolute h-5 w-5 transition-all duration-300 ease-in-out transform",
                    isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                  )}
                  strokeWidth={2}
                />
                <X
                  className={cn(
                    "absolute h-5 w-5 transition-all duration-300 ease-in-out transform",
                    isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                  )}
                  strokeWidth={2}
                />
              </div>
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "absolute top-full left-0 right-0 z-50 grid bg-white transition-all duration-300 ease-in-out md:hidden shadow-xl border-b border-gray-200 overflow-hidden",
            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pointer-events-none"
          )}
        >
          <div className="overflow-hidden">
            <nav className="flex flex-col py-2 px-3 bg-gray-50/50">
              {links.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={mobileNavItemClasses}
                >
                  {t(`navbar.${link.label}`)}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 z-40 cursor-default bg-primary-950/20 backdrop-blur-xs md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
            style={{ top: "5rem" }}
          />
        )}
      </header>
    );
  }
);

Navbar.displayName = "Navbar";