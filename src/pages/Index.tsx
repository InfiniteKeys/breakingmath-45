import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ResourcesSection from "@/components/ResourcesSection";
import EventsSection from "@/components/EventsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CountdownBanner from "@/components/CountdownBanner";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <CountdownBanner />
      <HeroSection />
      <AboutSection />
      <ResourcesSection />
      <EventsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
