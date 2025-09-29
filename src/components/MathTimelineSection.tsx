import { Calculator, BookOpen, Trophy, Users, Target, Lightbulb } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const mathTimelineData = [
  {
    id: 1,
    title: "Fundamentals",
    date: "Week 1-2",
    content: "Master basic mathematical operations, number theory, and algebraic foundations essential for competitive mathematics.",
    category: "Foundation",
    icon: Calculator,
    relatedIds: [2, 3],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 2,
    title: "Problem Solving",
    date: "Week 3-4",
    content: "Develop strategic thinking and analytical skills through diverse mathematical problems and proof techniques.",
    category: "Strategy",
    icon: Lightbulb,
    relatedIds: [1, 3, 4],
    status: "in-progress" as const,
    energy: 75,
  },
  {
    id: 3,
    title: "Advanced Topics",
    date: "Week 5-6",
    content: "Explore calculus, statistics, geometry, and advanced mathematical concepts for competition preparation.",
    category: "Advanced",
    icon: BookOpen,
    relatedIds: [2, 4, 5],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 4,
    title: "Practice Tests",
    date: "Week 7-8",
    content: "Take timed practice exams and mock competitions to build confidence and test-taking strategies.",
    category: "Assessment",
    icon: Target,
    relatedIds: [3, 5, 6],
    status: "pending" as const,
    energy: 30,
  },
  {
    id: 5,
    title: "Team Training",
    date: "Week 9-10",
    content: "Collaborate with peers in group problem-solving sessions and participate in team-based competitions.",
    category: "Collaboration",
    icon: Users,
    relatedIds: [4, 6],
    status: "pending" as const,
    energy: 20,
  },
  {
    id: 6,
    title: "Competition",
    date: "Week 11-12",
    content: "Apply all learned skills in actual mathematical competitions and olympiads to achieve excellence.",
    category: "Achievement",
    icon: Trophy,
    relatedIds: [5],
    status: "pending" as const,
    energy: 10,
  },
];

const MathTimelineSection = () => {
  return <RadialOrbitalTimeline timelineData={mathTimelineData} />;
};

export default MathTimelineSection;