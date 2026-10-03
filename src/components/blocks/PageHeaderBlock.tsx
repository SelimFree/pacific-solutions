import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { Image } from "../ui/Image";
import { FadeIn } from "../utils/FadeIn";
import { cn } from "../../lib/utils";

export interface PageHeaderBlockProps {
  title: string;
  subtitle: string;
  description?: string;
  backgroundImage?: string;
  className?: string;
}

export function PageHeaderBlock({
  title,
  subtitle,
  description,
  backgroundImage,
  className,
}: PageHeaderBlockProps) {
  return (
    <section
      className={cn(
        "relative w-full bg-primary-950 overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-white/10 font-sans",
        className
      )}
    >
      {backgroundImage ? (
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src={backgroundImage}
            alt="Header Background"
            className="w-full h-full object-cover object-[50%_center] "
            containerClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-linear-to-r from-primary-950 via-primary-950/40 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-primary-950 to-primary-950/20" />
        </div>
      ) : (
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          <div className="lg:col-span-7">
            <FadeIn direction="up" delay={0}>
              <div className="flex items-center gap-4 mb-5">
                <div className="h-1 w-10 bg-secondary" />
                <Text className="text-xs font-bold tracking-[0.2em] text-secondary uppercase">
                  {subtitle}
                </Text>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={150}>
              <Heading
                level={1}
                className="text-4xl sm:text-5xl lg:text-6xl text-white font-extrabold uppercase tracking-tight leading-[1.1]"
              >
                {title}
              </Heading>
            </FadeIn>
          </div>

          {description && (
            <div className="lg:col-span-5 pb-1 sm:pb-2">
              <FadeIn direction="up" delay={300}>
                <div className="lg:border-l border-white/20 lg:pl-6">
                  <Text className="text-gray-300 text-base sm:text-lg font-medium leading-relaxed">
                    {description}
                  </Text>
                </div>
              </FadeIn>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}