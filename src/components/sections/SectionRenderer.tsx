import type { PageSection } from "@/types/section";
import HeroSection from "./home/HeroSection";
import IntroSection from "./home/IntroSection";
import ServicesSection from "./services/ServicesSection";
import ServicesGridSection from "./services/ServicesGridSection";
import ServicesAccordionSection from "./services/ServicesAccordionSection";
import WhyChooseSection from "./home/WhyChooseSection";
import ClientLogosSection from "./home/ClientLogosSection";
import CtaSection from "./home/CtaSection";
import ContactBlockSection from "./contact/ContactBlockSection";
import AboutHeroSection from "./about/AboutHeroSection";
import AboutVisionMissionSection from "./about/AboutVisionMissionSection";
import AboutAdvantageSection from "./about/AboutAdvantageSection";
import AboutValuesSection from "./about/AboutValuesSection";
import ContactInquirySection from "./contact/ContactInquirySection";
import AboutOverviewSection from "./about/AboutOverviewSection";
import AboutFrameworkSection from "./about/AboutFrameworkSection";
import AboutCta from "./about/AboutCta";
import ServicesSectionCta from "./services/ServicesSectionCta";
import ServicesHeroSection from "./services/ServicesHeroSection";
import ProjectsHeroSection from "./projects/ProjectsHeroSection";
import ProjectsCapabilitiesSection from "./projects/ProjectsCapabilitiesSection";
import ProjectsPortfolioSection from "./projects/ProjectsPortfolioSection";
import LegalHeroSection from "./legal/LegalHeroSection";
import LegalDocumentSection from "./legal/LegalDocumentSection";

export default function SectionRenderer({
  pageSlug,
  section,
  featureFlags,
}: {
  pageSlug: string;
  section: PageSection;
  featureFlags?: Record<string, boolean>;
}) {
  const normalizedType =
    (section.type as string) === "industrieshero"
      ? "industriesHero"
      : (section.type as string) === "industriesgrid"
        ? "industriesGrid"
        : (section.type as string) === "industriescta"
          ? "industriesCta"
            : (section.type as string) === "servicesgrid"
              ? "servicesGrid"
              : (section.type as string) === "servicesaccordion"
                ? "servicesAccordion"
              : (section.type as string) === "servicescta"
                ? "servicesCTA"
                : (section.type as string) === "aboutoverview"
                  ? "aboutOverview"
            : section.type;

  if (normalizedType === "clientLogos" && featureFlags?.clientLogos === false) {
    return null;
  }

  switch (normalizedType) {
    case "hero":
      return (
        <HeroSection
          content={section.data as never}
          anchorId={pageSlug === "home" ? "home" : undefined}
        />
      );
    case "intro":
      return (
        <IntroSection
          content={section.data as never}
          anchorId={pageSlug === "home" ? "services" : undefined}
        />
      );
    case "services":
      return <ServicesSection content={section.data as never} />;

    case "whyChoose":
      return <WhyChooseSection content={section.data as never} />;
    case "clientLogos":
      return <ClientLogosSection content={section.data as never} />;
    case "cta":
      if (pageSlug === "about") {
        return <AboutCta content={section.data as never} />;
      }
      return (
        <CtaSection
          content={section.data as never}
          anchorId={pageSlug === "contact" ? undefined : "contact"}
        />
      );
    case "contact":
      return <ContactBlockSection content={section.data as never} />;
    case "contactHero":
      return null;
    case "contactInquiry":
      return <ContactInquirySection content={section.data as never} />;
    case "servicesHero":
      return <ServicesHeroSection content={section.data as never} />;
    case "projectsHero":
      return <ProjectsHeroSection content={section.data as never} />;
    case "projectsCapabilities":
      return <ProjectsCapabilitiesSection content={section.data as never} />;
    case "projectsPortfolio":
      return <ProjectsPortfolioSection content={section.data as never} />;
    case "servicesAccordion":
      return <ServicesAccordionSection content={section.data as never} />;
    case "servicesGrid":
      return <ServicesGridSection content={section.data as never} />;
    case "servicesCTA":
      return <ServicesSectionCta content={section.data as never}/>;
    case "aboutHero":
      return <AboutHeroSection content={section.data as never} />;
    case "aboutOverview":
      return <AboutOverviewSection content={section.data as never} />;
    case "aboutIntro":
      return <AboutOverviewSection content={section.data as never} />;
    case "aboutVisionMission":
      return <AboutVisionMissionSection content={section.data as never} />;
    case "aboutFramework":
      return <AboutFrameworkSection content={section.data as never} />;
    case "aboutAdvantage":
      return <AboutAdvantageSection content={section.data as never} />;
    case "aboutValues":
      return <AboutValuesSection content={section.data as never} />;
    case "aboutCTA":
      return <AboutCta content={section.data as never} />;
    case "legalHero":
      return <LegalHeroSection content={section.data as never} />;
    case "legalDocument":
      return <LegalDocumentSection content={section.data as never} />;
    default:
      return null;
  }
}
