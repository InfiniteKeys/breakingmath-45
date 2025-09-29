import { Mail, Award, Target, Heart } from "lucide-react";
import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee";
import { Features } from "@/components/ui/features-8";

const AboutSection = () => {
  const teamMembers = [
    {
      author: {
        name: "Ms. Issar",
        handle: "Teacher Supervisor",
        avatar: "https://i.ibb.co/XrB6Lnxn/Kanchan-png.png"
      },
      text: "Faculty advisor who mentors members, verifies questions, plans events, and links the club with opportunities."
    },
    {
      author: {
        name: "Mr. Kumar",
        handle: "Teacher Supervisor", 
        avatar: "https://i.ibb.co/dJP3CQPY/Ajay-png.png"
      },
      text: "Faculty advisor who guides, supports, and supervises club activities."
    },
    {
      author: {
        name: "Abdul Rahman Rahimi",
        handle: "President • Grade 12",
        avatar: "https://i.ibb.co/RGwD1Twj/Abdul-Rahman-png.png"
      },
      text: "Leads the Math Club, oversees activities and meetings, represents the club to teachers and school administration, and helps with competition questions when needed."
    },
    {
      author: {
        name: "Aarush Bansal",
        handle: "Vice President • Grade 12",
        avatar: "https://i.ibb.co/1f8j7qdT/Aarush-png.png"
      },
      text: "Assists with competitions, prepares and reviews questions, and helps with meeting preparation."
    },
    {
      author: {
        name: "Suyansh Mittal",
        handle: "Second VP & Question Coordinator • Grade 12",
        avatar: "https://i.ibb.co/QFXGwPj3/Suryansh-png.png"
      },
      text: "Creates competition questions, prepares materials, ensures everything is ready for events."
    },
    {
      author: {
        name: "Akankshya Panda",
        handle: "Communications & Outreach Officer • Grade 12",
        avatar: "https://i.ibb.co/jvRhrvrX/Akankshya-png.png"
      },
      text: "Manages social media and announcements, gives speeches when needed, and assists the Problem/Question Coordinator with preparing and reviewing competition materials."
    },
    {
      author: {
        name: "Sherry Naem",
        handle: "Question Coordinator Assistant • Grade 12",
        avatar: "https://i.ibb.co/KjTzYvr2/Sherry-png.png"
      },
      text: "Supports the Problem / Question Coordinator by helping draft, proof-read, and test competition questions and materials."
    },
    {
      author: {
        name: "Hasan Ahmad",
        handle: "Treasurer • Grade 12",
        avatar: "https://i.ibb.co/Zz7FpQzV/Hasan-png.png"
      },
      text: "Supports Treasurer 1, tracks spending, ensures budget is used properly."
    },
    {
      author: {
        name: "Moamel Al-Rammahi",
        handle: "Website Developer • Grade 12",
        avatar: "https://i.ibb.co/hJRGztcZ/Moamel-png.png"
      },
      text: "Manages and updates the Breaking Math website to keep it clear, useful, and up to date."
    }
  ];

  const clubStats = [
    { label: "Active Members", value: "1", suffix: " Year Running" },
    { label: "Competition Awards", value: "0", suffix: " This Year" },
    { label: "Weekly Sessions", value: "2", suffix: " Per Week" },
    { label: "Success Rate", value: "100%", suffix: " Satisfaction" }
  ];


  return (
    <>
      {/* Executive Team Section */}
      <section className="relative py-8 overflow-hidden">
        <TestimonialsSection
          title="Executive Team & Supervisors"
          description="Meet the passionate leaders and mentors driving Breaking Math forward with innovation and dedication."
          testimonials={teamMembers}
        />
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">About Breaking Math</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                We're a passionate community of mathematical minds at Bramalea Secondary School, 
                dedicated to making math fun, collaborative, and rewarding.
              </p>
            </div>

            {/* Features Section */}
            <Features />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
