import { notFound } from "next/navigation";

import Navbar from "../../../components/Navbar/Navbar";
import Contact from "../../../components/Contact/Contact";
import Footer from "../../../components/Footer/Footer";

import ServiceDetail from "../../../components/ServicesPage/ServiceDetail/ServiceDetail";

import {
  getServiceDetailBySlug,
  serviceDetails,
} from "../../../components/ServicesPage/ServiceDetail/serviceDetailData";

export function generateStaticParams() {
  return serviceDetails.map((service) => ({
    slug: service.slug.current,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceDetailBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.title,
    description: service.introduction,
  };
}

export default async function ServiceDetailPage({
  params,
}) {
  const { slug } = await params;
  const service = getServiceDetailBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main>
        <ServiceDetail service={service} />

        <Contact />
      </main>

      <Footer />
    </>
  );
}