import { Mail, Award, Target, Heart } from "lucide-react";

const AboutSection = () => {
  const teamMembers = [
    {
      name: "Abdul Rahman Rahimi",
      role: "President",
      grade: "Grade 12"
    },
    {
      name: "Aarush Bansal",
      role: "Vice President",
      grade: "Grade 12"
    },
    {
      name: "Suyansh Mittal",
      role: "Second Vice President & Question Coordinator",
      grade: "Grade 12"
    },
    {
      name: "Akankshya Panda",
      role: "Communications & Outreach Officer",
      grade: "Grade 12"
    },
    {
      name: "Sherry Naem",
      role: "Problem / Question Coordinator Assistant",
      grade: "Grade 12"
    },
    {
      name: "Hasan Ahmad",
      role: "Treasurer / Budget Officer 2",
      grade: "Grade 12"
    }
  ];

  const clubStats = [
    { label: "Active Members", value: "1", suffix: " Year Running" },
    { label: "Competition Awards", value: "0", suffix: " This Year" },
    { label: "Weekly Sessions", value: "2", suffix: " Per Week" },
    { label: "Success Rate", value: "100%", suffix: " Satisfaction" }
  ];

  const supervisors = [
    { name: "Ms. Issar", department: "Mathematics Department" },
    { name: "Mr. Kumar", department: "Mathematics Department" }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">About Breaking Math</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're a passionate community of mathematical minds at Bramalea Secondary School, 
              dedicated to making math fun, collaborative, and rewarding.
            </p>
          </div>

          {/* Mission Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="team-card">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fun & Friendship</h3>
              <p className="text-muted-foreground">
                Creating lasting friendships while exploring the beauty and excitement of mathematics together.
              </p>
            </div>

            <div className="team-card">
              <div className="bg-secondary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Competition Ready</h3>
              <p className="text-muted-foreground">
                Preparing for local and national math competitions while building confidence and problem-solving skills.
              </p>
            </div>

            <div className="team-card">
              <div className="bg-accent/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Career Focus</h3>
              <p className="text-muted-foreground">
                Encouraging mathematics-related career paths and providing guidance for future academic pursuits.
              </p>
            </div>
          </div>

          {/* Executive Team */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12">Executive Team</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-card text-center">
                  <div className="bg-gradient-to-r from-primary to-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">{member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-1">{member.name}</h4>
                  <p className="text-primary font-medium mb-1">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.grade}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Supervisors */}
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-8">Teacher Supervisors</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {supervisors.map((supervisor, index) => (
                <div key={index} className="team-card">
                  <div className="bg-gradient-to-r from-primary to-secondary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{supervisor.name}</h4>
                  <p className="text-muted-foreground">{supervisor.department}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
