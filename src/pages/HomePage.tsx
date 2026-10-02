import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { HeroBlock } from "../components/blocks/HeroBlock";
import { ApplicationsPreviewBlock } from "../components/blocks/ApplicationsPreviewBlock";
import { WhyUsBlock } from "../components/blocks/WhyUsBlock";
import { CtaStripBlock } from "../components/blocks/CtaStripBlock";

export default function HomePage() {

  const { t: tCommon } = useTranslation("common");
  useDocumentTitle(tCommon("navbar.home"));

  return (
    <div className="flex flex-col">
      <HeroBlock />
      <ApplicationsPreviewBlock/>
      <WhyUsBlock />
      <CtaStripBlock />
    </div>
  );
}