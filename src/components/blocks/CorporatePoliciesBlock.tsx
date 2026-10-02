import { useTranslation } from "react-i18next";
import { HardHat, Database, Scale } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { FadeIn } from "../utils/FadeIn";

const POLICIES = [
  { id: "hse", icon: HardHat },
  { id: "it", icon: Database },
  { id: "antiCorruption", icon: Scale },
];

export function CorporatePoliciesBlock() {
  const { t } = useTranslation("company");

  return (
    <section className="w-full bg-gray-100 py-24 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <FadeIn direction="up" delay={0}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-1 w-12 bg-secondary" />
              <Text className="text-xs font-black tracking-[0.2em] text-primary-900 uppercase">
                {t("corporatePoliciesBlock.subtitle")}
              </Text>
            </div>
          </FadeIn>
          
          <FadeIn direction="up" delay={150}>
            <Heading level={2} className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary-950 uppercase tracking-tight">
              {t("corporatePoliciesBlock.title")}
            </Heading>
          </FadeIn>
        </div>

        <div className="space-y-12">
          {POLICIES.map((policy, index) => {
            const Icon = policy.icon;
            
            return (
              <FadeIn key={policy.id} direction="up" delay={150 * (index + 1)}>
                <div className="bg-white border border-gray-200 shadow-sm relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-primary-950 transition-colors duration-500 group-hover:bg-secondary" />
                  
                  <div className="p-8 md:p-12 pl-12 md:pl-16">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 mb-10 items-start">
                      <div className="bg-gray-50 p-4 border border-gray-100 shrink-0">
                        <Icon className="h-10 w-10 text-primary-900" strokeWidth={1.5} />
                      </div>
                      <div>
                        <Heading level={3} className="text-2xl font-black text-primary-950 uppercase tracking-tight mb-4">
                          {t(`corporatePoliciesBlock.policies.${policy.id}.title`)}
                        </Heading>
                        <Text className="text-gray-600 font-medium leading-relaxed max-w-4xl text-justify">
                          {t(`corporatePoliciesBlock.policies.${policy.id}.summary`)}
                        </Text>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pt-8 border-t border-gray-100">
                      {[1, 2, 3, 4].map((pointIndex) => (
                        <div key={pointIndex} className="relative pl-6">
                          <div className="absolute left-0 top-2 w-2 h-2 bg-secondary" />
                          <Heading level={4} className="text-sm font-black text-primary-900 uppercase tracking-wide mb-2">
                            {t(`corporatePoliciesBlock.policies.${policy.id}.points.${pointIndex}.title`)}
                          </Heading>
                          <Text className="text-sm text-gray-600 leading-relaxed">
                            {t(`corporatePoliciesBlock.policies.${policy.id}.points.${pointIndex}.desc`)}
                          </Text>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}