import { useTranslation } from "react-i18next";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { PageHeaderBlock } from "../components/blocks/PageHeaderBlock";
import { ContactBlock } from "../components/blocks/ContactBlock";
import ContactBgImage from "../assets/contact/contact_banner.png";

export default function ContactPage() {
    const { t } = useTranslation("contact");
    const { t: tCommon } = useTranslation("common");
    useDocumentTitle(tCommon("navbar.contact"));

    return (
        <div className="flex flex-col">
            <PageHeaderBlock
                title={t("contactPage.header.title")}
                subtitle={t("contactPage.header.subtitle")}
                backgroundImage={ContactBgImage}
            />

            <ContactBlock />
        </div>
    );
}