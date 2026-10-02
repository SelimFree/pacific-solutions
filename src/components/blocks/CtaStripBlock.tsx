import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Mail, Phone, FileText } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Button } from "../ui/Button";
import { FadeIn } from "../utils/FadeIn";

export const CtaStripBlock = () => {
  const { t } = useTranslation("home");

  return (
    <section className="w-full bg-white py-14 sm:py-18 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="relative bg-primary-950 rounded-sm overflow-hidden p-8 sm:p-12 lg:p-14 border border-primary-900 shadow-xl">
            
            <div 
              className="absolute inset-0 opacity-[0.07] pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
                backgroundSize: "48px 48px"
              }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              <div className="lg:col-span-7">
                <span className="text-xs font-bold tracking-widest text-secondary uppercase block mb-3">
                  {t("ctaBlock.eyebrow")}
                </span>

                <Heading
                  level={2}
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 leading-tight"
                >
                  {t("ctaBlock.title")}
                </Heading>

                <Text className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
                  {t("ctaBlock.description")}
                </Text>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 pt-6 border-t border-white/10 text-xs sm:text-sm text-gray-300">
                  <a
                    href="tel:+821099986101"
                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Phone className="h-4 w-4 text-secondary" />
                    <span>+82 10-9998-6101</span>
                  </a>

                  <a
                    href="mailto:info@pacific-solutions.co.kr"
                    className="inline-flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Mail className="h-4 w-4 text-secondary" />
                    <span>info@pacific-solutions.co.kr</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end lg:items-end">
                <Link to="/contact" className="w-full sm:w-auto lg:w-full max-w-sm">
                  <Button
                    size="lg"
                    className="w-full h-12 px-6 bg-primary-700 hover:bg-primary-600 text-white font-semibold text-xs tracking-wider uppercase rounded-sm cursor-pointer border border-primary-500/50 shadow-md flex items-center justify-center gap-2 group transition-all"
                  >
                    <FileText className="h-4 w-4" />
                    <span>{t("ctaBlock.buttonPrimary")}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <Link to="/services" className="w-full sm:w-auto lg:w-full max-w-sm">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full h-12 px-6 bg-white/5 hover:bg-white/10 border-white/20 text-white font-medium text-xs tracking-wider uppercase rounded-sm cursor-pointer flex items-center justify-center gap-2 transition-all"
                  >
                    <span>{t("ctaBlock.buttonSecondary")}</span>
                  </Button>
                </Link>
              </div>

            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
};