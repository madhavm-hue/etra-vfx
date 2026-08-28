export const servicesHeroData = {
  _id: "services-page-hero",
  _type: "servicesHero",

  title: "Services — ETRA Dreams",

  description:
    "End-to-end visual effects services for feature films, streaming productions, episodic content, advertising, game cinematics, and global entertainment.",
};

export const servicesData = [
  {
    _id: "service-rotoscopy",
    _type: "service",

    number: "01",

    title: "Rotoscopy & Prep",

    slug: {
      current:
        "rotoscopy-keying-matte-extraction",
    },

    summary:
      "Precise isolation, detailed mattes, and carefully prepared plates that establish a reliable foundation for visual effects.",

    capabilities: [
      "Core and motion-blur roto",
      "Hair and fine-edge extraction",
      "Holdout mattes",
      "Wire and rig preparation",
    ],

    image: {
      src: "/images/services/rotoscopy.jpg",
      alt: "Rotoscopy and prep services",
    },

    preview: {
      src: "/images/services/rotoscopy.gif",
      alt: "Rotoscopy and prep preview",
    },

    order: 1,
  },

  {
    _id: "service-keying-mattes",
    _type: "service",

    number: "02",

    title: "Keying & Mattes",

    slug: {
      current: "keying-mattes",
    },

    summary:
      "Clean subject extraction and refined edges for convincing integration across complex production environments.",

    capabilities: [
      "Green and blue screen keying",
      "Matte extraction",
      "Edge refinement",
      "Spill suppression",
    ],

    /*
      Temporary fallback assets.
      Actual Keying assets varumbodhu
      src values mattum replace pannalaam.
    */

    image: {
      src: "/images/services/rotoscopy.jpg",
      alt: "Keying and matte extraction services",
    },

    preview: {
      src: "/images/services/rotoscopy.gif",
      alt: "Keying and matte extraction preview",
    },

    order: 2,
  },

  {
    _id: "service-paint-prep",
    _type: "service",

    number: "03",

    title: "Paint / Prep / Cleanup",

    slug: {
      current: "paint-prep",
    },

    summary:
      "Invisible cleanup and plate restoration that removes distractions while preserving the original performance.",

    capabilities: [
      "Wire and rig removal",
      "Beauty cleanup",
      "Marker removal",
      "Set and plate restoration",
    ],

    image: {
      src: "/images/services/paint-prep.jpg",
      alt: "Paint, prep and cleanup services",
    },

    preview: {
      src: "/images/services/paint-prep.gif",
      alt: "Paint, prep and cleanup preview",
    },

    order: 3,
  },

  {
    _id: "service-matchmove",
    _type: "service",

    number: "04",

    title: "Matchmove & Tracking",

    slug: {
      current: "match-move-rotomation",
    },

    summary:
      "Accurate camera and object tracking that connects digital elements naturally with live-action photography.",

    capabilities: [
      "Camera tracking",
      "Object and body tracking",
      "Character rotomation",
      "Lens and survey alignment",
    ],

    image: {
      src: "/images/services/matchmove.jpg",
      alt: "Matchmove and tracking services",
    },

    preview: {
      src: "/images/services/matchmove.gif",
      alt: "Matchmove and tracking preview",
    },

    order: 4,
  },

  {
    _id: "service-3d-assets",
    _type: "service",

    number: "05",

    title: "3D Assets & Digi-doubles",

    slug: {
      current: "3d-assets-digi-doubles",
    },

    summary:
      "Production-ready digital assets and photoreal characters built to perform consistently across complex shots.",

    capabilities: [
      "Hard-surface modelling",
      "Organic modelling",
      "Texturing and LookDev",
      "Digital doubles and rigging",
    ],

    image: {
      src: "/images/services/compositing-cgi.jpg",
      alt: "3D assets and digital doubles",
    },

    preview: {
      src: "/images/services/compositing-cgi.gif",
      alt: "3D assets and digital doubles preview",
    },

    order: 5,
  },

  {
    _id: "service-creature-fx",
    _type: "service",

    number: "06",

    title: "Creature FX",

    slug: {
      current: "creature-fx",
    },

    summary:
      "Character-driven simulation that gives digital creatures, garments, hair, and surfaces believable movement.",

    capabilities: [
      "Hair, fur and feathers",
      "Cloth and garment simulation",
      "Muscle and tissue dynamics",
      "Skin and soft-body effects",
    ],

    image: {
      src: "/images/services/compositing-cgi.jpg",
      alt: "Creature visual effects",
    },

    preview: {
      src: "/images/services/compositing-cgi.gif",
      alt: "Creature visual effects preview",
    },

    order: 6,
  },

  {
    _id: "service-environments",
    _type: "service",

    number: "07",

    title: "Environments & DMP",

    slug: {
      current: "environments-dmp",
    },

    summary:
      "Digital environments and set extensions that expand physical locations into rich cinematic worlds.",

    capabilities: [
      "Set extensions",
      "Digital matte painting",
      "Sky and background replacement",
      "Camera projections",
    ],

    image: {
      src: "/images/services/compositing-cgi.jpg",
      alt: "Digital environments and matte painting",
    },

    preview: {
      src: "/images/services/compositing-cgi.gif",
      alt: "Digital environments preview",
    },

    order: 7,
  },

  {
    _id: "service-fx-dynamics",
    _type: "service",

    number: "08",

    title: "FX & Dynamics",

    slug: {
      current: "fx-dynamics",
    },

    summary:
      "Story-driven simulations that add energy, atmosphere, destruction, and physical realism to every frame.",

    capabilities: [
      "Fire, smoke and explosions",
      "Fluid and particle effects",
      "Weather and atmosphere",
      "Destruction and fracturing",
    ],

    image: {
      src: "/images/services/compositing-cgi.jpg",
      alt: "FX simulations and dynamics",
    },

    preview: {
      src: "/images/services/compositing-cgi.gif",
      alt: "FX simulations and dynamics preview",
    },

    order: 8,
  },

  {
    _id: "service-lighting-rendering",
    _type: "service",

    number: "09",

    title: "Lighting & Rendering",

    slug: {
      current: "lighting-rendering",
    },

    summary:
      "Cinematic lighting and carefully optimized rendering that place digital elements convincingly within the shot.",

    capabilities: [
      "Lighting matching",
      "Shot lighting",
      "Surface and shader development",
      "Render optimization",
    ],

    image: {
      src: "/images/services/compositing-cgi.jpg",
      alt: "Lighting and rendering services",
    },

    preview: {
      src: "/images/services/compositing-cgi.gif",
      alt: "Lighting and rendering preview",
    },

    order: 9,
  },

  {
    _id: "service-compositing-cgi",
    _type: "service",

    number: "10",

    title: "Compositing & CGI Integration",

    slug: {
      current:
        "compositing-cgi-integration",
    },

    summary:
      "The final integration of live action, digital assets, environments, and effects into one seamless image.",

    capabilities: [
      "2D and 3D compositing",
      "CGI integration",
      "Screen replacement",
      "Colour and light matching",
    ],

    image: {
      src: "/images/services/compositing-cgi.jpg",
      alt: "Compositing and CGI integration",
    },

    preview: {
      src: "/images/services/compositing-cgi.gif",
      alt: "Compositing and CGI integration preview",
    },

    order: 10,
  },
];