import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountdownBanner from "@/components/CountdownBanner";
import AnnouncementsSection from "@/components/AnnouncementsSection";

const Announcements = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CountdownBanner />
      <main>
        <AnnouncementsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Announcements;