import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const EventsSection = () => {
  const events = [
    {
      id: 1,
      name: "Regional Math Competition",
      date: "2026-01-15",
      time: "9:00 AM",
      location: "University of Toronto",
      description: "Annual regional mathematics competition featuring algebra, geometry, and calculus problems.",
      participants: "All grades welcome"
    },
    {
      id: 2,
      name: "Pi Day Celebration",
      date: "2026-03-14",
      time: "3:14 PM",
      location: "School Cafeteria",
      description: "Celebrating the mathematical constant π with games, puzzles, and of course, pie!",
      participants: "Open to all students"
    },
    {
      id: 3,
      name: "Math Olympics Training",
      date: "2026-02-20",
      time: "3:30 PM",
      location: "Room 205",
      description: "Intensive training session preparing for upcoming Math Olympics competition.",
      participants: "Club members only"
    },
    {
      id: 4,
      name: "Guest Speaker: Dr. Sarah Mitchell",
      date: "2026-01-28",
      time: "12:00 PM",
      location: "School Auditorium",
      description: "Renowned mathematician speaking about careers in applied mathematics and data science.",
      participants: "All students invited"
    }
  ];

  const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
    const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    });

    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const target = new Date(targetDate).getTime();
        const difference = target - now;

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
          });
        }
      }, 1000);

      return () => clearInterval(timer);
    }, [targetDate]);

    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="countdown-timer">
          <span className="countdown-number">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="countdown-label">Days</span>
        </div>
        <div className="countdown-timer">
          <span className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="countdown-label">Hours</span>
        </div>
        <div className="countdown-timer">
          <span className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="countdown-label">Min</span>
        </div>
        <div className="countdown-timer">
          <span className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="countdown-label">Sec</span>
        </div>
      </div>
    );
  };

  return (
    <section id="events" className="py-20 grid-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Upcoming Events</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join us for exciting mathematical competitions, workshops, and social events throughout the year.
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                {/* Event Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                    <div className="flex items-center text-muted-foreground text-sm space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {event.time}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{event.participants}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Countdown Timer */}
                <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
                  <p className="text-sm font-semibold text-center mb-4 text-primary">⏱️ Time Remaining:</p>
                  <CountdownTimer targetDate={event.date} />
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl p-8 border border-primary/30 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 text-primary">Don't Miss Out!</h3>
              <p className="text-lg mb-6 text-foreground/90">
                Join Breaking Math today and be part of all these amazing events and competitions.
              </p>
              <a href="#join" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25 hover:scale-105">
                Join Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;