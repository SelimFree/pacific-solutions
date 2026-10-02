import { forwardRef, type ComponentProps } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Text } from "../ui/Text";
import { List, ListItem } from "../ui/List";
import type { NavLinkItem } from "./Layout";
import { Image } from "../ui/Image";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/AppContext";

import Logo from "../../assets/logo.png";

export interface FooterProps extends ComponentProps<"footer"> {
  links: NavLinkItem[];
}

export const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ links, className, ...props }, ref) => {
    const { t } = useTranslation("common");
    const { companyName } = useAppContext();

    return (
      <footer
        ref={ref}
        className={cn("bg-primary-950 border-t border-white/10 text-white font-sans", className)}
        {...props}
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

            <div className="md:col-span-2 lg:col-span-5">
              <Link to="/" className="group inline-flex items-center gap-3 outline-none mb-5">
                <Image
                  src={Logo}
                  aspectRatio="auto"
                  alt={t("navbar.logoAlt", "Pacific Solutions Logo")}
                  className="h-10 w-10 object-contain brightness-0 invert opacity-95 transition-opacity group-hover:opacity-100"
                  containerClassName="w-fit shrink-0 bg-transparent"
                />
                <div className="flex flex-col justify-center select-none">
                  <span className="text-lg font-extrabold tracking-wider text-white uppercase leading-none">
                    PACIFIC
                  </span>
                  <span className="text-[11px] font-bold tracking-[0.22em] text-secondary uppercase leading-none mt-1">
                    SOLUTIONS
                  </span>
                </div>
              </Link>

              <Text className="max-w-sm text-xs sm:text-sm leading-relaxed text-gray-400 font-medium mb-6">
                {t("footer.slogan")}
              </Text>
            </div>

            <div className="lg:col-span-4">
              <Text className="mb-5 text-xs font-bold tracking-widest text-white uppercase flex items-center gap-2">
                <span>{t("footer.contact")}</span>
              </Text>

              <ul className="grid gap-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-gray-400 leading-relaxed">
                    {t("footer.addressInfo")}
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-secondary shrink-0" />
                  <a
                    href={`tel:${t("footer.phoneInfo")}`}
                    className="text-xs sm:text-sm font-medium text-gray-400 hover:text-white transition-colors"
                  >
                    {t("footer.phoneInfo")}
                  </a>
                </li>

                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-secondary shrink-0" />
                  <a
                    href={`mailto:${t("footer.emailInfo")}`}
                    className="text-xs sm:text-sm font-medium text-gray-400 hover:text-white transition-colors"
                  >
                    {t("footer.emailInfo")}
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3">
              <Text className="mb-5 text-xs font-bold tracking-widest text-white uppercase">
                {t("footer.quickLinks")}
              </Text>

              <List className="grid gap-y-3">
                {links.filter((_, i) => i < 3).map((link) => (
                  <ListItem key={link.href} icon={null} className="p-0">
                    <Link
                      to={link.href}
                      className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-400 transition-colors hover:text-white"
                    >
                      <span>{t(`navbar.${link.label}`)}</span>
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-secondary" />
                    </Link>
                  </ListItem>
                ))}
              </List>
            </div>

          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row text-xs text-gray-500">
            <Text className="text-xs font-medium text-gray-400 uppercase">
              {t("footer.rights", {
                company: companyName || "Pacific Solutions",
                year: new Date().getFullYear(),
              })}
            </Text>

            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-gray-300 transition-colors">
                {t("footer.privacy")}
              </Link>
              <span className="text-white/20">|</span>
              <Link to="/terms" className="hover:text-gray-300 transition-colors">
                {t("footer.terms")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = "Footer";