import { ArrowRight, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const HeroSection = () => {
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    email: "",
    interests: [] as string[],
    experience: "",
    motivation: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Application Submitted! 🎉",
      description: "Welcome to Breaking Math! We'll be in touch soon with meeting details.",
    });
    
    // Reset form
    setFormData({
      name: "",
      grade: "",
      email: "",
      interests: [],
      experience: "",
      motivation: ""
    });
    
    setShowJoinDialog(false);
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <>
    <section id="home" className="min-h-screen flex items-center grid-background relative">
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">Official Math Club of Bramalea Secondary</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Breaking Math
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            A Fun and Exciting Math Club at Bramalea Secondary!
          </p>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Join our passionate community of mathematical minds where problem-solving meets friendship. 
            We compete, collaborate, and celebrate the beauty of mathematics together.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-hero group" onClick={() => setShowJoinDialog(true)}>
              Join Breaking Math
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Button>
            <a href="#events">
              <Button className="btn-secondary group">
                <Calendar className="mr-2 h-5 w-5" />
                View Events
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Competitions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Awards Won</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">3rd</div>
              <div className="text-sm text-muted-foreground">Year Running</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Join Dialog */}
    <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Join Breaking Math</DialogTitle>
          <DialogDescription>
            Fill out this application to become a member of our math club community!
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="grade">Grade</Label>
              <Select value={formData.grade} onValueChange={(value) => setFormData(prev => ({...prev, grade: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9">Grade 9</SelectItem>
                  <SelectItem value="10">Grade 10</SelectItem>
                  <SelectItem value="11">Grade 11</SelectItem>
                  <SelectItem value="12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Mathematical Interests (Select all that apply)</Label>
            <div className="grid grid-cols-2 gap-3">
              {["Algebra", "Geometry", "Calculus", "Statistics", "Number Theory", "Discrete Math"].map((interest) => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest}
                    checked={formData.interests.includes(interest)}
                    onCheckedChange={() => handleInterestChange(interest)}
                  />
                  <Label htmlFor={interest} className="text-sm font-normal">
                    {interest}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Previous Math Competition Experience</Label>
            <Textarea
              id="experience"
              value={formData.experience}
              onChange={(e) => setFormData(prev => ({...prev, experience: e.target.value}))}
              placeholder="Tell us about any math competitions, clubs, or related activities you've participated in..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="motivation">Why do you want to join Breaking Math?</Label>
            <Textarea
              id="motivation"
              value={formData.motivation}
              onChange={(e) => setFormData(prev => ({...prev, motivation: e.target.value}))}
              placeholder="Share what motivates you to join our club and what you hope to achieve..."
              rows={3}
              required
            />
          </div>

          <Button type="submit" className="w-full btn-hero">
            Submit Application
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default HeroSection;