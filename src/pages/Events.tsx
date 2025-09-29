import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountdownBanner from "@/components/CountdownBanner";
import EventsSection from "@/components/EventsSection";

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CountdownBanner />
      <main className="pt-20">
        <EventsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Events;