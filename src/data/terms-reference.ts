export type LegalDocumentSectionItem = {
  title: string;
  paragraphs: string[];
  introBeforeBullets?: string;
  bullets?: string[];
  outroAfterBullets?: string;
  contact?: {
    companyName: string;
    email: string;
    phone: string;
  };
};

export const DEFAULT_LEGAL_HERO = {
  title: "Terms & Conditions",
};

export const DEFAULT_LEGAL_DOCUMENT_SECTIONS: LegalDocumentSectionItem[] = [
  {
    title: "1. Introduction",
    paragraphs: [
      "These Terms of Use govern your access to and use of the Adam Technology website. By accessing or using this website, you agree to be bound by these Terms of Use.",
      "If you do not agree to these Terms, you should not use this website.",
    ],
  },
  {
    title: "2. Website Content",
    paragraphs: [
      "The content on this website is provided for general informational purposes only. It is intended to give an overview of Adam Technology, its services, sectors, capabilities and areas of focus.",
      "Nothing on this website constitutes legal, financial, tax, investment or other professional advice, and no reliance should be placed on any website content without obtaining specific professional advice appropriate to your circumstances.",
    ],
  },
  {
    title: "3. No Client or Advisory Relationship",
    paragraphs: [
      "Accessing this website, sending an enquiry, downloading content, submitting a form, or communicating with us through the website does not create a client relationship, advisory relationship, fiduciary relationship or any duty of care beyond those required by law.",
      "Any professional relationship with Adam Technology will arise only under a formal engagement, subscription, membership or other written agreement.",
    ],
  },
  {
    title: "4. Services, Memberships and Subscriptions",
    paragraphs: [
      "Adam Technology may offer advisory, coordination, support, membership or subscription-based services.",
      "Any such services are subject to specific terms, scope, limitations, pricing, renewal arrangements and engagement conditions communicated separately or included in a formal agreement.",
      "Website references to services, support models, subscriptions or memberships are descriptive only and do not constitute a binding offer unless expressly stated otherwise.",
    ],
  },
  {
    title: "5. User Accounts and Access",
    paragraphs: [
      "If we provide client login, member access, portal access or account-based functionality, you are responsible for maintaining the confidentiality of your credentials and for all activity occurring under your account.",
      "You must not share your access credentials with unauthorised persons or attempt to gain access to systems, accounts or data that are not intended for you. We may suspend, restrict or terminate access where misuse, non-payment, security concerns or unauthorised access is suspected.",
    ],
  },
  {
    title: "6. Fees and Payments",
    paragraphs: [
      "Where services or memberships are fee-based, fees, billing cycles, payment methods, renewals, suspensions and termination rights will be governed by the relevant engagement terms or subscription terms.",
      "Failure to pay fees when due may result in suspension, restriction or termination of access or services, subject to applicable terms.",
    ],
  },
  {
    title: "7. Intellectual Property",
    paragraphs: [
      "Unless otherwise stated, all content on this website, including text, design, structure, graphics, branding, logos, icons, materials and downloadable content, is owned by or licensed to Adam Technology and is protected by applicable intellectual property laws.",
      "You may view and use this website for lawful, informational and non-commercial purposes only. You may not reproduce, distribute, modify, republish, transmit, sell or exploit website content without our prior written consent.",
    ],
  },
  {
    title: "8. Acceptable Use",
    paragraphs: [],
    introBeforeBullets: "You agree not to:",
    bullets: [
      "Use this website for unlawful, fraudulent or harmful purposes;",
      "Attempt unauthorised access to any part of the website, systems or accounts;",
      "Interfere with website functionality, security or availability;",
      "Upload or transmit malicious code, harmful files or disruptive material;",
      "Misuse forms, contact tools or communications features; or",
      "Use website content in a misleading or unauthorised manner.",
    ],
  },
  {
    title: "9. Third-Party Links and Content",
    paragraphs: [
      "This website may contain links to third-party websites or services. Such links are provided for convenience only.",
      "Adam Technology does not control and is not responsible for the content, availability, accuracy or practices of third-party sites.",
    ],
  },
  {
    title: "10. No Warranties",
    paragraphs: [
      'This website and its content are provided on an "as is" and "as available" basis. While we aim to keep information accurate and current, we make no representation or warranty, express or implied, regarding accuracy, completeness, availability, reliability or suitability.',
    ],
  },
  {
    title: "11. Limitation of Liability",
    paragraphs: [],
    introBeforeBullets:
      "To the fullest extent permitted by law, Adam Technology disclaims liability for any direct, indirect, incidental, consequential, special or other loss arising from or in connection with:",
    bullets: [
      "Use of, or inability to use, this website;",
      "Reliance on website content;",
      "Website interruption, delays or errors;",
      "Viruses or other harmful components; or",
      "Unauthorised access to or alteration of data.",
    ],
    outroAfterBullets: "Nothing in these Terms excludes liability where such exclusion is not permitted by law.",
  },
  {
    title: "12. Confidentiality of Website Communications",
    paragraphs: [
      "Information submitted through the website, including through contact forms or general enquiries, should not be treated as automatically privileged, secure or confidential unless and until a formal relationship has been established and specific confidentiality obligations apply.",
    ],
  },
  {
    title: "13. Privacy and Cookies",
    paragraphs: [
      "Your use of this website is also subject to our Privacy Policy and Cookie Policy.",
    ],
  },
  {
    title: "14. Changes to these Terms",
    paragraphs: [
      "We may amend these Terms of Use from time to time. Updated versions will be posted on this page.",
      "Continued use of the website after any update constitutes acceptance of the revised Terms.",
    ],
  },
  {
    title: "15. Governing Law and Jurisdiction",
    paragraphs: [
      "These Terms of Use are governed by the laws of the United Arab Emirates. Any dispute arising from or in connection with these Terms shall be subject to the jurisdiction of the competent courts of the UAE, unless otherwise required by applicable law or agreed in writing.",
    ],
  },
  {
    title: "16. Contact Us",
    paragraphs: ["For questions regarding these Terms of Use, please contact:"],
    contact: {
      companyName: "Adam Technology",
      email: "Connect@AdamTechnology.com",
      phone: "+91 9876565431",
    },
  },
];

export const DEFAULT_LEGAL_DOCUMENT = {
  sections: DEFAULT_LEGAL_DOCUMENT_SECTIONS,
};
