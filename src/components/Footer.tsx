import { Calculator, Instagram, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground footer-slide-up">
      <div className="container mx-auto px-4 py-12 footer-fade-in">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white/10 p-2 rounded-lg">
                <Calculator className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Breaking Math</h3>
                <p className="text-sm opacity-80">Bramalea Secondary School</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed max-w-md">
              Empowering students through mathematics, fostering friendship through competition, 
              and building confidence through collaboration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="footer-link text-primary-foreground/80">
                  About Us
                </a>
              </li>
              <li>
                <a href="#events" className="footer-link text-primary-foreground/80">
                  Events
                </a>
              </li>
              <li>
                <a href="#announcements" className="footer-link text-primary-foreground/80">
                  Announcements
                </a>
              </li>
              <li>
                <a href="#join" className="footer-link text-primary-foreground/80">
                  Join Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 footer-icon opacity-80" />
                <span className="text-sm text-primary-foreground/80">Room 205, Bramalea Secondary</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 footer-icon opacity-80" />
                <span className="text-sm text-primary-foreground/80">ms.issar@bramalea.ca</span>
              </li>
              <li className="flex items-center space-x-2">
                <Instagram className="h-4 w-4 footer-icon opacity-80" />
                <span className="text-sm text-primary-foreground/80">@breakingmath_bramalea</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-primary-foreground/60 mb-4 md:mb-0">
            © 2024 Breaking Math Club - Bramalea Secondary School. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <a href="#" className="footer-link text-sm text-primary-foreground/60">
              Privacy Policy
            </a>
            <a href="#" className="footer-link text-sm text-primary-foreground/60">
              Code of Conduct
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;