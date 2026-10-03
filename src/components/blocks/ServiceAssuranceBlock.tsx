import { useTranslation } from "react-i18next";
import { ShieldCheck, FileCheck2, PackageCheck, Truck } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { FadeIn } from "../utils/FadeIn";

const ASSURANCE_KEYS = ["warranty", "qa", "packaging", "incoterms"] as const;
type AssuranceKey = typeof ASSURANCE_KEYS[number];

const ICONS: Record<AssuranceKey, typeof ShieldCheck> = {
  warranty: ShieldCheck,
  qa: FileCheck2,
  packaging: PackageCheck,
  incoterms: Truck,
};

interface AssuranceItem {
  code: string;
  title: string;
  description: string;
}

export function ServiceAssuranceBlock() {
  const { t } = useTranslation("services");

  return (
    <section className="w-full bg-primary-950 py-20 sm:py-24 border-b border-white/10 text-white font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <FadeIn direction="up" delay={0}>
            <span className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-white/4 text-[10px] font-mono font-bold tracking-widest text-secondary uppercase rounded-xs border border-white/10">
              <ShieldCheck className="h-3 w-3 text-secondary" />
              {t("serviceAssuranceBlock.eyebrow")}
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={100}>
            <Heading level={2} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              {t("serviceAssuranceBlock.title")}
            </Heading>
          </FadeIn>

          <FadeIn direction="up" delay={200}>
            <Text className="mt-4 text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto text-justify">
              {t("serviceAssuranceBlock.description")}
            </Text>
          </FadeIn>
        </div>

        <FadeIn direction="up" delay={300}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-white/1">
            {ASSURANCE_KEYS.map((key) => {
              const item = t(`serviceAssuranceBlock.items.${key}`, { returnObjects: true }) as AssuranceItem;
              const Icon = ICONS[key];

              return (
                <div key={key} className="p-6 sm:p-8 flex flex-col justify-between hover:bg-white/2 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs text-gray-500 font-bold">{item.code}</span>
                      <Icon className="h-5 w-5 text-secondary" />
                    </div>

                    <h4 className="text-base font-bold text-white mb-3">
                      {item.title}
                    </h4>

                    <p className="text-xs text-gray-400 font-normal leading-relaxed test-left">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 uppercase font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {t("serviceAssuranceBlock.guaranteedBadge")}
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>

      </div>
    </section>
  );
}