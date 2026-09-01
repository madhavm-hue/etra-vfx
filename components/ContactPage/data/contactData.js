export const contactHeroData = {
  eyebrow: "Contact ETRA Dreams",
  title: "Let’s Create",
  highlightedTitle: "Something Extraordinary.",
  description:
    "From the first idea to the final frame, our team is ready to collaborate, solve creative challenges, and bring your vision to life.",
  availability: "Available for projects worldwide",
};

export const officeLocationsData = {
  eyebrow: "Global Presence",
  title: "Where Ideas",
  highlightedTitle: "Meet Production.",
  description:
    "Connect with the ETRA Dreams team through our production office in India or our sales office in Canada.",
  offices: [
    {
      number: "01",
      type: "Production",
      location: "Sattur, Tamil Nadu, India",
      timezone: "Indian Standard Time",
      timezoneShort: "IST",
      email: "hr@etradreams.com",
      phone: "+91 99655 73184",
      phoneHref: "+919965573184",
      accent: "pink",
    },
    {
      number: "02",
      type: "Sales Office",
      location: "Montreal, Canada",
      timezone: "Eastern Standard Time",
      timezoneShort: "EST",
      email: "etravfxprod@etradreams.com",
      phone: null,
      phoneHref: null,
      accent: "purple",
    },
  ],
};

export const contactFormData = {
  eyebrow: "Start a Conversation",
  title: "Tell Us About",
  highlightedTitle: "Your Project.",
  description:
    "Share a few details about your project and our production team will get back to you as soon as possible.",
  fields: [
    {
      id: "fullName",
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Your name",
      autoComplete: "name",
      required: true,
    },
    {
      id: "email",
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "you@company.com",
      autoComplete: "email",
      required: true,
    },
    {
      id: "phone",
      name: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "+91 98765 43210",
      autoComplete: "tel",
      required: false,
    },
    {
      id: "company",
      name: "company",
      label: "Company / Studio",
      type: "text",
      placeholder: "Company name",
      autoComplete: "organization",
      required: false,
    },
  ],
  serviceOptions: [
    "Rotoscopy & Prep",
    "Keying & Mattes",
    "Paint / Prep / Cleanup",
    "Matchmove & Tracking",
    "3D Assets & Digi-doubles",
    "Creature FX",
    "Complete VFX Production",
    "Other",
  ],
  submitLabel: "Send Enquiry",
  successTitle: "Thank you for reaching out.",
  successMessage:
    "Your enquiry has been received. Our production team will contact you shortly.",
};
export const productionMapData = {
  eyebrow: "Production Office",
  title: "Find Us",
  highlightedTitle: "In Tamil Nadu.",
  company: "Etra Dreams Private Limited",
  address:
    "3/402/B, Muthuramalingapuram, Padanthal, Padandal, Tamil Nadu 626203, India",
  mapButtonLabel: "Open in Google Maps",
};