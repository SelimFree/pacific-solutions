import { useTranslation } from "react-i18next";
import { Radio } from "lucide-react";
import { Heading } from "../ui/Heading";
import { Text } from "../ui/Text";
import { FadeIn } from "../utils/FadeIn";
import WorldMapImage from "../../assets/company/world_map.svg";
const MAP = { w: 950, h: 620 };
const PROJ = { lonMin: -180, lonMax: 180, latMax: 90, latMin: -90 };

const project = (lon: number, lat: number) => ({
  x: ((lon - PROJ.lonMin) / (PROJ.lonMax - PROJ.lonMin)) * MAP.w,
  y: ((PROJ.latMax - lat) / (PROJ.latMax - PROJ.latMin)) * MAP.h,
});

const TL = project(-20, 68);
const BR = project(150, -8);
const VIEW = { x: TL.x, y: TL.y, w: BR.x - TL.x, h: BR.y - TL.y };
const ORIGIN = { id: "seoul", ...project(118, 31) };

const DESTINATIONS = [
  { id: "tokyo",     lon: 130.7, lat: 29.2,  delay: 0 },
  { id: "osaka",     lon: 126.5, lat: 28.2,  delay: 1.5 },
  { id: "taipei",    lon: 112.6, lat: 18.5,  delay: 0.8 },
  { id: "hanoi",     lon: 96.9,  lat: 14.5,  delay: 2.2 },
  { id: "singapore", lon: 94.8,  lat: -5.2,  delay: 1.1 },
  { id: "frankfurt", lon: -0.3,  lat: 43.6,  delay: 0.4 },
  { id: "london",    lon: -9.1,  lat: 45.0,  delay: 1.9 },
  { id: "milan",     lon: 0.2,   lat: 39.0,  delay: 2.6 },
  { id: "istanbul",  lon: 20.0,  lat: 34.5,  delay: 1.3 },
].map((d) => ({ ...d, ...project(d.lon, d.lat) }));

function arcPath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const cx = mx;
  const cy = my - dist * 0.25;
  return `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
}

const FADE_MASK =
  "radial-gradient(ellipse 60% 50% at 50% 50%, #000 85%, transparent 100%)";

export function GlobalNetworkBlock() {
  const { t } = useTranslation("company");

  return (
    <section className="w-full bg-primary-950 py-20 sm:py-24 lg:py-28 overflow-hidden font-sans relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <FadeIn direction="up" delay={0}>
              <span className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-white/4 text-[10px] font-mono font-bold tracking-widest text-secondary uppercase rounded-xs">
                <Radio className="h-3 w-3 text-secondary animate-pulse" />
                {t("globalNetworkBlock.eyebrow")}
              </span>
            </FadeIn>

            <FadeIn direction="up" delay={100}>
              <Heading
                level={2}
                className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.15]"
              >
                {t("globalNetworkBlock.title")}
              </Heading>
            </FadeIn>

            <FadeIn direction="up" delay={200}>
              <Text className="mt-5 text-gray-300 text-sm sm:text-base leading-relaxed text-justify">
                {t("globalNetworkBlock.description")}
              </Text>
            </FadeIn>

            <FadeIn direction="up" delay={300}>
              <Text className="mt-4 text-gray-300 text-sm sm:text-base leading-relaxed text-justify">
                {t("globalNetworkBlock.paragraph1")}
              </Text>
            </FadeIn>
            <FadeIn direction="up" delay={400}>
              <Text className="mt-4 text-gray-300 text-sm sm:text-base leading-relaxed text-justify">
                {t("globalNetworkBlock.paragraph2")}
              </Text>
            </FadeIn>
          </div>

          <FadeIn direction="up" delay={300}>
            <div
              className="relative w-full"
              style={{
                aspectRatio: `${VIEW.w} / ${VIEW.h}`,
                WebkitMaskImage: FADE_MASK,
                maskImage: FADE_MASK,
              }}
            >
              <svg
                viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <filter
                    id="glow"
                    filterUnits="userSpaceOnUse"
                    x={VIEW.x - 50}
                    y={VIEW.y - 50}
                    width={VIEW.w + 100}
                    height={VIEW.h + 100}
                  >
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <image
                  href={WorldMapImage}
                  x={0}
                  y={0}
                  width={MAP.w}
                  height={MAP.h}
                  preserveAspectRatio="none"
                  style={{ filter: "invert(1)", opacity: 0.3 }}
                />

                <g>
                  <circle
                    cx={ORIGIN.x}
                    cy={ORIGIN.y}
                    r="6"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1"
                    className="animate-node-ping"
                  />
                  <circle cx={ORIGIN.x} cy={ORIGIN.y} r="3" fill="#38bdf8" filter="url(#glow)" />
                  <circle cx={ORIGIN.x} cy={ORIGIN.y} r="1.2" fill="#fff" />
                </g>

                {DESTINATIONS.map((d) => {
                  const path = arcPath(ORIGIN, d);
                  return (
                    <g key={d.id}>
                      <path
                        d={path}
                        fill="none"
                        stroke="rgba(56,189,248,0.15)"
                        strokeWidth="0.8"
                        strokeDasharray="3 3"
                      />
                      <path
                        d={path}
                        pathLength={100}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        filter="url(#glow)"
                        className="animate-beam"
                        style={{ animationDelay: `${d.delay}s` }}
                      />
                      <circle cx={d.x} cy={d.y} r="1.8" fill="#0284c7" />
                      <circle
                        cx={d.x}
                        cy={d.y}
                        r="3.5"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="0.8"
                        opacity="0.5"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}