import { Calendar, Users, Instagram, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Squares } from "@/components/ui/squares-background";
import GlitchText from "@/components/ui/glitch-text";
import { Typewriter } from "@/components/ui/typewriter-text";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const HeroSection = () => {

  return (
    <>
    <section id="home" className="min-h-screen flex items-center justify-center relative py-20">
      <div className="absolute inset-0 z-0">
        <Squares 
          direction="diagonal"
          speed={0.3}
          squareSize={40}
          borderColor="rgba(255, 255, 255, 0.05)" 
          hoverFillColor="rgba(255, 255, 255, 0.02)"
        />
        {/* Even dimmer grid for large monitors */}
        <div className="hidden 2xl:block absolute inset-0">
          <Squares 
            direction="diagonal"
            speed={0.3}
            squareSize={40}
            borderColor="rgba(255, 255, 255, 0.03)" 
            hoverFillColor="rgba(255, 255, 255, 0.01)"
          />
        </div>
      </div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">Official Math Club of Bramalea Secondary</span>
          </div>

          {/* Main Title - Simple */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 text-white">
              Breaking Math Club
            </h1>
            
            {/* Typewriter subtitle */}
            <div className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              <Typewriter
                text={["Rise to the Challenge", "Solve Complex Problems", "Master Mathematics"]}
                speed={100}
                loop={true}
                className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              />
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            Experience the fun of math like never before. Tackle challenges, enjoy friendly competition, and earn prizes for your dedication and clever solutions.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Mobile buttons */}
            <div className="flex flex-col gap-2 sm:hidden">
              {/* Join button - full width on mobile */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="bg-primary border border-primary text-primary-foreground hover:bg-primary/90 py-3 px-6 w-full group">
                    <User className="mr-2 h-5 w-5" />
                    Join Breaking Math
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-screen h-screen max-w-none p-0 m-0" side="right">
                  <div className="flex flex-col h-full">
                    <SheetHeader className="p-6 border-b">
                      <SheetTitle>Join Breaking Math</SheetTitle>
                    </SheetHeader>
                    <div className="flex-1 overflow-hidden">
                      <iframe
                        src="https://tally.so/r/wkqjaJ"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                        title="Join Breaking Math Form"
                        style={{ overflow: 'hidden' }}
                      />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              {/* Events and Announcements buttons */}
              <div className="flex gap-2">
                <a href="#events" className="flex-1">
                  <Button className="bg-transparent border border-white/20 text-white hover:bg-white/10 py-2 px-4 text-sm w-full group">
                    <Calendar className="mr-1 h-4 w-4 text-white" />
                    Events
                  </Button>
                </a>
                <a href="/announcements" className="flex-1">
                  <Button className="bg-transparent border border-white/20 text-white hover:bg-white/10 py-2 px-4 text-sm w-full group">
                    <Calendar className="mr-1 h-4 w-4 text-white" />
                    Announcements
                  </Button>
                </a>
              </div>
            </div>
            {/* Desktop buttons */}
            <div className="hidden sm:flex gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="bg-primary/20 border border-primary/30 text-white hover:bg-primary/30 py-3 px-6 group">
                    <User className="mr-2 h-5 w-5 text-white" />
                    Join Breaking Math
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-screen h-screen max-w-none p-0 m-0" side="right">
                  <div className="flex flex-col h-full">
                    <SheetHeader className="p-6 border-b">
                      <SheetTitle>Join Breaking Math</SheetTitle>
                    </SheetHeader>
                    <div className="flex-1 overflow-hidden">
                      <iframe
                        src="https://tally.so/r/wkqjaJ"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        marginHeight={0}
                        marginWidth={0}
                        title="Join Breaking Math Form"
                        style={{ overflow: 'hidden' }}
                      />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <a href="#events">
                <Button className="bg-transparent border border-white/20 text-white hover:bg-white/10 py-3 px-6 group">
                  <Calendar className="mr-2 h-5 w-5 text-white" />
                  View Events
                </Button>
              </a>
            </div>
          </div>

          {/* Advisor Text - All devices */}
          <div className="mt-6 flex justify-center">
            <div className="flex items-center space-x-2 text-white/70 text-sm">
              <User className="h-4 w-4" />
              <span>Guided by our amazing advisor, Ms. Issar</span>
            </div>
          </div>

          {/* Instagram Button - Mobile only */}
          <div className="mt-4 flex justify-center sm:hidden">
            <a 
              href="https://www.instagram.com/bss.math?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-orange-400 p-0.5 transition-all duration-700 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/25">
                <div className="relative flex items-center space-x-2 rounded-full bg-black/20 backdrop-blur-sm px-4 py-2 text-white transition-all duration-700 group-hover:bg-black/10">
                  <Instagram className="h-5 w-5 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" />
                  <span className="text-sm font-medium transition-all duration-700 group-hover:text-white">@bss.math</span>
                </div>
              </div>
              {/* Animated background pulse */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-orange-400 opacity-0 transition-opacity duration-700 group-hover:opacity-20 animate-pulse"></div>
            </a>
          </div>


          {/* Stats - Hidden on mobile */}
          <div className="mt-16 hidden sm:grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">8</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Competitions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">0</div>
              <div className="text-sm text-muted-foreground">Awards Won</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">1st</div>
              <div className="text-sm text-muted-foreground">Year Running</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    </>
  );
};

export default HeroSection;
