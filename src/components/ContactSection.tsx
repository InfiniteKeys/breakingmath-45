import { Mail, Instagram, MapPin, Clock, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions about Breaking Math? Want to learn more about our activities? 
              We'd love to hear from you!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                {/* Teacher Supervisors */}
                <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                  <h4 className="font-semibold mb-4 flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-primary" />
                    Teacher Supervisors
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Ms. Issar</span>
                      <a 
                        href="mailto:p0188851@pdsb.net" 
                        className="text-primary hover:underline"
                      >
                        p0188851@pdsb.net
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Mr. Kumar</span>
                      <a 
                        href="mailto:p0201001@pdsb.net" 
                        className="text-primary hover:underline"
                      >
                        p0201001@pdsb.net
                      </a>
                    </div>
                  </div>
                </div>

                {/* Club Information */}
                <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                  <h4 className="font-semibold mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    Club Location
                  </h4>
                  <p className="text-muted-foreground mb-2">Bramalea Secondary School</p>
                  <p className="text-muted-foreground mb-2">Room 208 (Mathematics Department)</p>
                  <p className="text-muted-foreground">150 Dunrankin Drive, Brampton, ON</p>
                </div>

                {/* Meeting Times */}
                <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                  <h4 className="font-semibold mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    Meeting Schedule
                  </h4>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Regular Meetings:</strong> Tuesdays & Thursdays, 3:30 PM - 4:30 PM</p>
                    <p><strong>Competition Prep:</strong> Saturdays, 10:00 AM - 12:00 PM</p>
                    <p><strong>Special Events:</strong> As announced</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                  <h4 className="font-semibold mb-4 flex items-center">
                    <Instagram className="h-5 w-5 mr-2 text-primary" />
                    Follow Us
                  </h4>
                  <div className="flex items-center space-x-4">
                    <a 
                      href="https://instagram.com/breakingmath_bramalea" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-primary hover:text-secondary transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                      <span>@breakingmath_bramalea</span>
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Follow us for event updates, member highlights, and behind-the-scenes content!
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Message Form */}
            <div>
              <h3 className="text-2xl font-bold mb-8">Send Us a Message</h3>
              
              <div className="bg-card rounded-xl p-8 border border-border shadow-lg">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Select a topic</option>
                      <option value="membership">Membership Inquiry</option>
                      <option value="events">Event Information</option>
                      <option value="competition">Competition Questions</option>
                      <option value="general">General Question</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full btn-hero">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>

                {/* Quick Contact Options */}
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    Need immediate assistance? Try these options:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="mr-2 h-4 w-4" />
                      School Office: (905) 793-0019
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="mr-2 h-4 w-4" />
                      Quick Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-center mb-12">Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">When do you meet?</h4>
                  <p className="text-muted-foreground">
                    We meet twice a week: Tuesdays and Thursdays from 3:30-4:30 PM in Room 208. 
                    Additional Saturday sessions are held for competition preparation.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Do I need to be good at math to join?</h4>
                  <p className="text-muted-foreground">
                    Not at all! We welcome students of all skill levels. Our goal is to help everyone 
                    improve and develop a love for mathematics in a supportive environment.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Is there a membership fee?</h4>
                  <p className="text-muted-foreground">
                    Basic membership is free! We only ask for small contributions for special events, 
                    competition fees, or optional club materials.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Can I join mid-semester?</h4>
                  <p className="text-muted-foreground">
                    Absolutely! New members are welcome any time during the school year. 
                    We'll help you catch up and get involved right away.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;