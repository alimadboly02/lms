import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Home, BookOpen, Star, PenLine, Headset } from "lucide-react";
import logoImage from "figma:asset/9fb5bb008cfa075620dedaf2d6ee1171c8069760.png";

interface FooterProps {
  onPrivacyPolicyClick?: () => void;
  onTermsClick?: () => void;
  onHomeClick?: () => void;
  onCategoryClick?: (categoryId: string) => void;
  onAddReviewClick?: () => void;
  onSupportClick?: () => void;
}

export function Footer({ onPrivacyPolicyClick, onTermsClick, onHomeClick, onCategoryClick, onAddReviewClick, onSupportClick }: FooterProps) {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Decorative Dots Pattern */}
      <div className="absolute inset-0 opacity-10">
        {/* Top Right Dots */}
        <div className="absolute top-12 right-20 w-32 h-32 grid grid-cols-8 gap-1">
          {Array.from({ length: 64 }).map((_, i) => (
            <div
              key={`dot-tr-${i}`}
              className="w-1 h-1 rounded-full bg-emerald-400"
            />
          ))}
        </div>

        {/* Bottom Left Dots */}
        <div className="absolute bottom-32 left-32 w-24 h-24 grid grid-cols-6 gap-1">
          {Array.from({ length: 36 }).map((_, i) => (
            <div
              key={`dot-bl-${i}`}
              className="w-1 h-1 rounded-full bg-teal-400"
            />
          ))}
        </div>

        {/* Center Dots */}
        <div className="absolute top-1/3 left-1/2 w-28 h-28 grid grid-cols-7 gap-1">
          {Array.from({ length: 49 }).map((_, i) => (
            <div
              key={`dot-c-${i}`}
              className="w-1 h-1 rounded-full bg-emerald-300"
            />
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-7xl pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">روابط سريعة</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={onHomeClick}
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 block"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button
                  onClick={onAddReviewClick}
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 block"
                >
                  شارك تجربتك
                </button>
              </li>
              <li>
                <button
                  onClick={onSupportClick}
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 block"
                >
                  الدعم الفني
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">الأجيال والأقسام</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onCategoryClick?.('2008')}
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 block"
                >
                  جيل 2008
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategoryClick?.('2009')}
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 block"
                >
                  جيل 2009
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">تواصل معنا</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">0791234567</p>
                  <p className="text-gray-300 text-sm">0781234567</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">info@khaled-dajah.com</p>
                  <p className="text-gray-300 text-sm">contact@khaled-dajah.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">عمان - الأردن</p>
                  <p className="text-gray-300 text-sm">شارع الجامعة الأردنية</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">روابط قانونية</h3>
            <ul className="space-y-3 mb-6">
              <li>
                <button
                  onClick={onPrivacyPolicyClick}
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 block text-right"
                >
                  سياسة الخصوصية
                </button>
              </li>
              <li>
                <button
                  onClick={onTermsClick}
                  className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 block text-right"
                >
                  الشروط والأحكام
                </button>
              </li>
            </ul>

            {/* Social Media */}
            <h3 className="text-lg font-bold mb-4 text-white">تابعنا</h3>
            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="#facebook"
                className="w-10 h-10 bg-slate-700/50 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group"
              >
                <Facebook className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#twitter"
                className="w-10 h-10 bg-slate-700/50 hover:bg-sky-500 rounded-full flex items-center justify-center transition-all duration-300 group"
              >
                <Twitter className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#instagram"
                className="w-10 h-10 bg-slate-700/50 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
              <a
                href="#youtube"
                className="w-10 h-10 bg-slate-700/50 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 group"
              >
                <Youtube className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and Copyright */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-md overflow-hidden shadow-lg flex items-center justify-center bg-white">
              <img 
                src={logoImage} 
                alt="Dr. Khaled Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-bold text-white text-lg">د. خالد الدعجة</h4>
              <p className="text-gray-400 text-sm">
                © 2025 جميع الحقوق محفوظة
              </p>
            </div>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg group"
          >
            <svg
              className="w-5 h-5 text-white transform group-hover:-translate-y-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>

        {/* Powered By Section */}
        <div className="mt-8 pt-6 border-t border-slate-700">
          <p className="text-center text-white text-sm">
            POWERED BY{" "}
            <span className="font-bold">Ali Madboly</span>
            {" - "}
            <a
              href="tel:01203796455"
              className="font-bold hover:text-emerald-300 transition-colors"
            >
              01203796455
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}