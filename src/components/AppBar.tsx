import { Menu, X, LogOut, User as UserIcon, Lock, UserCircle } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import logoImage from "figma:asset/9fb5bb008cfa075620dedaf2d6ee1171c8069760.png";

interface AppBarProps {
  onHomeClick?: () => void;
  onProfileClick?: () => void;
  onChangePasswordClick?: () => void;
}

export function AppBar({ onHomeClick, onProfileClick, onChangePasswordClick }: AppBarProps = {}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const navLinks = [
    { name: "الرئيسية", href: "#home" },
    { name: "الأقسام", href: "#categories" },
    { name: "من نحن", href: "#about" },
    { name: "الأسئلة الشائعة", href: "#faq" },
    { name: "الصدارة", href: "#leaderboard" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-emerald-100 shadow-sm">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-md overflow-hidden shadow-lg flex items-center justify-center bg-white">
              <img 
                src={logoImage} 
                alt="Dr. Khaled Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-right">
              <h3 className="font-bold text-gray-800 text-lg leading-tight">
                د. خالد الدعجة
              </h3>
              <p className="text-xs text-gray-500">
                اللغة الإنجليزية - التوجيهي
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (link.name === "الرئيسية" && onHomeClick) {
                    e.preventDefault();
                    onHomeClick();
                  }
                }}
                className="text-gray-700 hover:text-emerald-600 font-semibold transition-colors duration-200 relative group cursor-pointer"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 rounded-[25px] transition-all"
                >
                  <UserIcon className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">{user.name}</span>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-[5px] shadow-lg border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 bg-emerald-50">
                      <p className="font-bold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.phone}</p>
                      <p className="text-xs text-emerald-600 mt-1">جيل {user.generation} - {user.city}</p>
                    </div>
                    <button
                      onClick={() => {
                        if (onProfileClick) onProfileClick();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-right text-emerald-600 hover:bg-emerald-50 transition-all"
                    >
                      <UserCircle className="w-5 h-5" />
                      <span className="font-semibold">الملف الشخصي</span>
                    </button>
                    <button
                      onClick={() => {
                        if (onChangePasswordClick) onChangePasswordClick();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-right text-gray-700 hover:bg-gray-50 transition-all border-t border-gray-100"
                    >
                      <Lock className="w-5 h-5" />
                      <span className="font-semibold">تغيير كلمة المرور</span>
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-right text-red-600 hover:bg-red-50 transition-all border-t border-gray-100"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-semibold">تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            ) : null}
            
            <button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-2.5 rounded-[25px] font-semibold transition-all duration-300 shadow-md hover:shadow-lg relative overflow-hidden">
              {/* عناصر خلفية زخرفية */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-2 -right-2 w-10 h-10 border border-white/20 rounded-full"></div>
                <div className="absolute -bottom-2 -left-2 w-12 h-12 border border-white/15 rounded-full"></div>
                <div className="absolute top-1 right-8 w-1 h-1 bg-white/30 rounded-full"></div>
                <div className="absolute bottom-1 left-10 w-1 h-1 bg-white/25 rounded-full"></div>
              </div>
              <span className="relative z-10">تواصل معنا</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-emerald-600 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-emerald-100">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {/* User Info Mobile */}
            {isAuthenticated && user && (
              <div className="bg-emerald-50 rounded-[5px] p-4 mb-4 space-y-2">
                <div className="flex items-center gap-3 mb-3">
                  <UserIcon className="w-6 h-6 text-emerald-600" />
                  <div>
                    <p className="font-bold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.phone}</p>
                  </div>
                </div>
                <p className="text-xs text-emerald-600 mb-3">جيل {user.generation} - {user.city}</p>
                
                <button
                  onClick={() => {
                    if (onProfileClick) onProfileClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-[5px] hover:bg-emerald-600 transition-all"
                >
                  <UserCircle className="w-4 h-4" />
                  <span className="font-semibold text-sm">الملف الشخصي</span>
                </button>
                
                <button
                  onClick={() => {
                    if (onChangePasswordClick) onChangePasswordClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-[5px] hover:bg-gray-700 transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span className="font-semibold text-sm">تغيير كلمة المرور</span>
                </button>
                
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-[5px] hover:bg-red-600 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-semibold text-sm">تسجيل الخروج</span>
                </button>
              </div>
            )}

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (link.name === "الرئيسية" && onHomeClick) {
                    e.preventDefault();
                    onHomeClick();
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="block text-gray-700 hover:text-emerald-600 font-semibold py-2 px-4 rounded-md hover:bg-emerald-50 transition-all duration-200 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-[25px] font-semibold transition-all duration-300 shadow-md relative overflow-hidden">
              {/* عناصر خلفية زخرفية */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-3 -right-3 w-14 h-14 border-2 border-white/20 rounded-full"></div>
                <div className="absolute top-1/2 -left-4 w-16 h-16 border-2 border-white/15 rounded-full"></div>
                <div className="absolute top-2 right-12 w-1.5 h-1.5 bg-white/30 rounded-full"></div>
                <div className="absolute bottom-2 left-16 w-1 h-1 bg-white/25 rounded-full"></div>
                <svg className="absolute -bottom-1 right-8 opacity-15" width="50" height="25" viewBox="0 0 50 25">
                  <path d="M0,12 Q12,6 25,12 T50,12" stroke="white" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <span className="relative z-10">تواصل معنا</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}