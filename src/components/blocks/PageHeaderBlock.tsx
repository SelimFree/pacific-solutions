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
  className 
}: PageHeaderBlockProps) {
  return (
    <section className={cn("relative w-full bg-primary-950 overflow-hidden py-20 sm:py-28 lg:py-32 border-b-4 border-secondary", className)}>
      
      {backgroundImage ? (
        <div className="absolute inset-0 pointer-events-none">
          <Image 
            src={backgroundImage} 
            alt="Header Background" 
            className="w-full h-full object-cover object-[50%_center] md:object-center grayscale opacity-30 mix-blend-luminosity"
            containerClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-linear-to-r from-primary-950 via-primary-950/80 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-primary-950 to-transparent opacity-80" />
        </div>
      ) : (
        <div className="absolute inset-0 opacity-[0.03] bg-[url('../../assets/patterns/grid.svg')] pointer-events-none" />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start">
        <FadeIn direction="up" delay={0}>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-1 w-12 bg-secondary" />
            <Text className="text-xs font-black tracking-[0.2em] text-secondary uppercase">
              {subtitle}
            </Text>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={150}>
          <Heading level={1} className="text-4xl sm:text-5xl lg:text-6xl text-white font-black uppercase tracking-tight">
            {title}
          </Heading>
        </FadeIn>

        {description && (
          <FadeIn direction="up" delay={300}>
            <Text className="mt-6 text-gray-300 max-w-2xl text-base md:text-lg font-medium leading-relaxed border-l-2 border-white/20 pl-4">
              {description}
            </Text>
          </FadeIn>
        )}
      </div>
      
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/10 pointer-events-none hidden md:block" />
      <div className="absolute bottom-8 right-8 text-[10px] font-black tracking-widest text-white/10 uppercase pointer-events-none hidden md:block">
        RG // {subtitle}
      </div>
    </section>
  );
}