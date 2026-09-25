import siteData from "@/src/data/siteData.json";

export function getStructuredData(baseUrl = "https://romartel.vercel.app") {
  const credentials = [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Google Data Analytics Certified",
      credentialCategory: "Professional Certificate",
      recognizedBy: { "@type": "Organization", name: "Google" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Microsoft Power BI Data Analyst",
      credentialCategory: "Professional Certificate",
      recognizedBy: { "@type": "Organization", name: "Microsoft" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "HubSpot Inbound & CRM Automation",
      credentialCategory: "Certification",
      recognizedBy: { "@type": "Organization", name: "HubSpot" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "CertiProf Scrum Product Owner",
      credentialCategory: "Certification",
      recognizedBy: { "@type": "Organization", name: "CertiProf" },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Python Automation & Scripting",
      credentialCategory: "Certification",
      recognizedBy: { "@type": "Organization", name: "Python Institute" },
    },
  ];

  const person = {
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: siteData.profile.name,
    jobTitle: siteData.profile.title,
    description: siteData.profile.bio,
    url: baseUrl,
    image: `${baseUrl}/avatar.webp`,
    sameAs: [
      siteData.metadata.socialLinks.linkedin,
      siteData.metadata.socialLinks.github,
      siteData.metadata.socialLinks.twitter,
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Salvador",
      addressCountry: "SV",
    },
    worksFor: {
      "@type": "Organization",
      name: siteData.experience[0].company,
    },
    knowsAbout: [
      "Marketing Operations",
      "Workflow Automation",
      "CRM Integrations",
      "Salesforce",
      "HubSpot",
      "Zapier",
      "Make.com",
      "Python",
      "Data Analytics",
      "Power BI",
    ],
    hasCredential: credentials,
  };

  const webSite = {
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: siteData.metadata.title,
    description: siteData.metadata.description,
    publisher: { "@id": `${baseUrl}/#person` },
    inLanguage: ["en", "es"],
  };

  const profilePage = {
    "@type": "ProfilePage",
    "@id": `${baseUrl}/#profilepage`,
    url: baseUrl,
    name: siteData.metadata.title,
    mainEntity: { "@id": `${baseUrl}/#person` },
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${baseUrl}/#faq`,
    mainEntity: [
      {
        "@type": "Question",
        name: "What does Rodrigo Martel specialize in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rodrigo Martel specializes in marketing operations, no-code and low-code workflow automation (Make, Zapier, Python), CRM integrations (Salesforce, HubSpot), and data analytics.",
        },
      },
      {
        "@type": "Question",
        name: "What automation and CRM tools does Rodrigo Martel integrate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rodrigo designs integrated pipelines across Salesforce, HubSpot, Zapier, Make.com, webhooks, and Python scripts with reliable automated monitoring and error logging.",
        },
      },
      {
        "@type": "Question",
        name: "How can I book a call or contact Rodrigo Martel?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book directly via WhatsApp, compose directly in Gmail to rop.martel@gmail.com, or schedule a conversation through Clippo, the on-site conversational assistant.",
        },
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, webSite, profilePage, faqPage],
  };
}
