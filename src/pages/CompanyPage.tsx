import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageHeaderBlock } from "../components/blocks/PageHeaderBlock";
import { CorporateHeritageBlock } from "../components/blocks/CorporateHeritageBlock";
import CompanyBgImage from "../assets/company/company_banner.png";
import { CorporatePoliciesBlock } from "../components/blocks/CorporatePoliciesBlock";
import { OperationalEthosBlock } from "../components/blocks/OperationalEthosBlock";

export default function CompanyPage() {
    const { t } = useTranslation("company");
    const { t: tCommon } = useTranslation("common");
    useDocumentTitle(tCommon("navbar.company"));

    return (
        <div className="flex flex-col">
            <PageHeaderBlock
                title={t("companyPage.header.title")}
                subtitle={t("companyPage.header.subtitle")}
                backgroundImage={CompanyBgImage}
            />
            <CorporateHeritageBlock />
            <CorporatePoliciesBlock />
            <OperationalEthosBlock />
        </div>
    );
}