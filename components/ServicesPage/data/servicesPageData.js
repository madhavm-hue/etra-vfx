export const servicesHeroData = {
  _id: "services-page-hero",
  _type: "servicesHero",

  title: "Services - Etra Dreams",

  description:
    "We specialize in delivering premium VFX services for Feature Films, Animated Movies, Television Episodic Work, Advertising, and the Entertainment Industry.",
};

export const servicesData = [
  {
    _id: "service-rotoscopy",
    _type: "service",

    number: "01",

    title: "Rotoscopy - Keying / Matte extraction",

    slug: {
      current: "rotoscopy-keying-matte-extraction",
    },

    image: {
      src: "/images/services/rotoscopy.jpg",
      alt: "Rotoscopy, keying and matte extraction",
    },

    preview: {
      src: "/images/services/rotoscopy.gif",
      alt: "Rotoscopy, keying and matte extraction preview",
    },

    order: 1,
  },

  {
    _id: "service-paint-prep",
    _type: "service",

    number: "02",

    title: "Paint - Prep",

    slug: {
      current: "paint-prep",
    },

    image: {
      src: "/images/services/paint-prep.jpg",
      alt: "Paint and prep",
    },

    preview: {
      src: "/images/services/paint-prep.gif",
      alt: "Paint and prep preview",
    },

    order: 2,
  },

  {
    _id: "service-matchmove",
    _type: "service",

    number: "03",

    title: "Match-move / Rotomation",

    slug: {
      current: "match-move-rotomation",
    },

    image: {
      src: "/images/services/matchmove.jpg",
      alt: "Match-move and rotomation",
    },

    preview: {
      src: "/images/services/matchmove.gif",
      alt: "Match-move and rotomation preview",
    },

    order: 3,
  },

  {
    _id: "service-compositing-cgi",
    _type: "service",

    number: "04",

    title: "Compositing / CGI integration",

    slug: {
      current: "compositing-cgi-integration",
    },

    image: {
      src: "/images/services/compositing-cgi.jpg",
      alt: "Compositing and CGI integration",
    },

    preview: {
      src: "/images/services/compositing-cgi.gif",
      alt: "Compositing and CGI integration preview",
    },

    order: 4,
  },
];