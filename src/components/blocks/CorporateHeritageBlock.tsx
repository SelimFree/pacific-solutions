import { useTranslation } from "react-i18next";
import { ShieldCheck } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { FadeIn } from "../utils/FadeIn";

const STANDARDS = [
  { id: "iso", label: "ISO 9001:2015", tKey: "isoDesc" },
  { id: "api", label: "API", tKey: "apiDesc" },
  { id: "asme", label: "ASME", tKey: "asmeDesc" },
  { id: "leea", label: "LEEA", tKey: "leeaDesc" },
  { id: "imca", label: "IMCA", tKey: "imcaDesc" },
  { id: "tds", label: "TDS", tKey: "tdsDesc" },
];

export function CorporateHeritageBlock() {
  const { t } = useTranslation("company");

  return (
    <section className="w-full bg-white py-24 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          <div className="lg:col-span-5 flex flex-col justify-center">
            <FadeIn direction="up" delay={0}>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-1 w-12 bg-secondary" />
                <Text className="text-xs font-black tracking-[0.2em] text-primary-900 uppercase">
                  {t("corporateHeritageBlock.subtitle")}
                </Text>
              </div>
            </FadeIn>
            
            <FadeIn direction="up" delay={150}>
              <Heading level={2} className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary-950 uppercase tracking-tight mb-8">
                {t("corporateHeritageBlock.title")}
              </Heading>
            </FadeIn>

            <FadeIn direction="up" delay={300}>
              <div className="space-y-6">
                <Text className="text-gray-600 text-base leading-relaxed font-medium text-justify">
                  {t("corporateHeritageBlock.p1")}
                </Text>
                <Text className="text-gray-600 text-base leading-relaxed text-justify font-medium">
                  {t("corporateHeritageBlock.p2")}
                </Text>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <FadeIn direction="up" delay={200}>
              <div className="mb-6 flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-secondary" strokeWidth={2} />
                <Heading level={3} className="text-sm font-black tracking-widest text-primary-900 uppercase">
                  {t("corporateHeritageBlock.gridTitle")}
                </Heading>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 bg-gray-200 border border-gray-200 p-px">
                {STANDARDS.map((standard) => (
                  <div 
                    key={standard.id} 
                    className="group relative bg-white p-6 flex flex-col items-center justify-center text-center transition-colors duration-300 hover:bg-primary-950 active:bg-primary-950 min-h-35"
                  >
                    <span className="text-2xl md:text-3xl font-black text-primary-950 tracking-tight group-hover:text-white group-active:text-white transition-colors">
                      {standard.label}
                    </span>
                    <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-secondary group-active:text-secondary transition-colors">
                      {t(`corporateHeritageBlock.standards.${standard.tKey}`)}
                    </span>
                    <div className="absolute bottom-0 left-0 w-0 h-1 bg-secondary transition-all duration-300 group-hover:w-full" />
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}