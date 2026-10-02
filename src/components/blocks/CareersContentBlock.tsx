import { useTranslation } from "react-i18next";
import { Mail, Briefcase, ShieldCheck } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { FadeIn } from "../utils/FadeIn";

export function CareersContentBlock() {
  const { t } = useTranslation("careers");
  const emailAddress = t("careersContentBlock.email");

  return (
    <section className="w-full py-16 md:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <FadeIn direction="up">
              <div className="flex items-center gap-4 mb-2">
                <div className="h-px w-12 bg-gray-300" />
                <Heading level={3} className="text-sm font-black tracking-widest text-primary-900 uppercase">
                  {t("careersPage.header.title")}
                </Heading>
              </div>
              
              <Heading level={2} className="text-3xl md:text-5xl font-black text-primary-950 uppercase tracking-tight leading-tight border-l-4 border-secondary pl-6">
                {t("careersContentBlock.title")}
              </Heading>
            </FadeIn>

            <FadeIn direction="up" delay={100}>
              <Text className="text-gray-600 text-base md:text-lg leading-relaxed text-justify max-w-2xl">
                {t("careersContentBlock.description")}
              </Text>
            </FadeIn>

            <FadeIn direction="up" delay={200}>
              <div className="flex gap-6 mt-4">
                <div className="flex flex-col gap-2">
                  <ShieldCheck className="h-6 w-6 text-primary-900" />
                  <span className="text-xs font-black tracking-widest uppercase text-primary-950">Uncompromising Safety</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Briefcase className="h-6 w-6 text-primary-900" />
                  <span className="text-xs font-black tracking-widest uppercase text-primary-950">Technical Excellence</span>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="w-full lg:w-1/2">
            <FadeIn direction="left" delay={200}>
              <div className="bg-primary-950 p-8 md:p-12 flex flex-col gap-8 rounded-sm relative overflow-hidden shadow-2xl border-t-4 border-secondary">
                
                <Mail className="absolute -bottom-10 -right-10 h-64 w-64 text-white/5 pointer-events-none -rotate-12" />

                <div className="relative z-10">
                  <Heading level={3} className="text-2xl font-black text-white uppercase tracking-wide mb-4">
                    {t("careersContentBlock.applyTitle")}
                  </Heading>
                  
                  <div className="bg-primary-900/50 border border-white/10 p-6 rounded-sm mb-8">
                    <Text className="text-gray-300 text-sm leading-relaxed">
                      <span dangerouslySetInnerHTML={{ 
                        __html: t("careersContentBlock.applyDescription").replace(
                          "You must state your desired position title in the email subject line",
                          "<strong class='text-white font-black'>You must state your desired position title in the email subject line</strong>"
                        )
                      }} />
                    </Text>
                  </div>

                  <a 
                    href={`mailto:${emailAddress}`}
                    className="group flex items-center justify-between bg-secondary hover:bg-secondary-500 text-primary-950 px-6 py-4 transition-colors duration-300 rounded-sm cursor-pointer shadow-lg w-full"
                  >
                    <span className="text-sm font-black tracking-widest uppercase">
                      {t("careersContentBlock.emailLabel")}
                    </span>
                    <Mail className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  </a>
                </div>

              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}