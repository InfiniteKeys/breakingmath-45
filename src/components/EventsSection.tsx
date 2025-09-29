import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
interface Event {
  id: string;
  name: string;
  description: string | null;
  date: string;
  time: string;
  location: string;
  participants: string;
}
const EventsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('public_events').select('*').order('date', {
        ascending: true
      });
      if (error) {
        console.error('Error fetching events:', error);
        // Show user-friendly message for network issues
        if (error.message.includes('NetworkError') || error.message.includes('CORS')) {
          console.warn('Network connectivity issue detected. This may be due to network restrictions.');
        }
      } else {
        setEvents(data || []);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      // Fallback to static content if network is completely blocked
      if (error instanceof TypeError && error.message.includes('NetworkError')) {
        console.warn('Using fallback mode due to network restrictions');
        setEvents([]);
      }
    } finally {
      setLoading(false);
    }
  };
  const CountdownTimer = ({
    targetDate
  }: {
    targetDate: string;
  }) => {
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
            hours: Math.floor(difference % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)),
            minutes: Math.floor(difference % (1000 * 60 * 60) / (1000 * 60)),
            seconds: Math.floor(difference % (1000 * 60) / 1000)
          });
        }
      }, 1000);
      return () => clearInterval(timer);
    }, [targetDate]);
    return <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
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
      </div>;
  };
  return <section id="events" className="py-20">
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
          {loading ? <div className="text-center py-16">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading events...</p>
            </div> : events.length === 0 ? <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No events scheduled at the moment.</p>
              <p className="text-muted-foreground mt-2">Check back soon for upcoming events!</p>
            </div> : <div className="grid lg:grid-cols-2 gap-8">
              {events.map(event => <div key={event.id} className="event-card">
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
                        {new Date(`2000-01-01T${event.time}`).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
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
                  {event.description && <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>}
                </div>

                {/* Countdown Timer */}
                <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
                  <p className="text-sm font-semibold text-center mb-4 text-primary">⏱️ Time Remaining:</p>
                  <CountdownTimer targetDate={event.date} />
                </div>
              </div>)}
            </div>}

          {/* Call to Action */}
          <div className="text-center mt-16">
            
          </div>
        </div>
      </div>
    </section>;
};
export default EventsSection;