import { motion, useMotionValue, useTransform } from 'motion/react';
import { Home as HomeIcon, ChevronLeft } from 'lucide-react';
import React from 'react';

interface PageHeaderProps {
  title: string;
  breadcrumb?: string;
  onBack?: () => void;
  showBreadcrumb?: boolean;
}

export function PageHeader({ title, breadcrumb, onBack, showBreadcrumb = true }: PageHeaderProps) {
  // Mouse tracking for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Transform values for parallax - Only 4 elements with controlled movement
  const x1 = useTransform(mouseX, [-0.5, 0.5], [-8, 8]);
  const y1 = useTransform(mouseY, [-0.5, 0.5], [-8, 8]);
  const x2 = useTransform(mouseX, [-0.5, 0.5], [8, -8]);
  const y2 = useTransform(mouseY, [-0.5, 0.5], [8, -8]);

  return (
    <div 
      className="relative bg-gray-50 py-20 overflow-hidden border-b border-gray-200"
      onMouseMove={handleMouseMove}
    >
      {/* Decorative Dots - Top Left - CORNER ONLY */}
      <motion.div 
        style={{ x: x1, y: y1 }}
        className="absolute top-12 left-12 md:top-16 md:left-20 w-16 h-16 grid grid-cols-4 gap-1.5 opacity-12"
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={`dot-tl-${i}`}
            className="w-1.5 h-1.5 rounded-full bg-emerald-500"
          />
        ))}
      </motion.div>

      {/* Decorative Wavy Lines - Top Right - CORNER ONLY */}
      <motion.div 
        style={{ x: x2, y: y2 }}
        className="absolute top-12 right-12 md:top-16 md:right-20 opacity-12"
      >
        <svg width="70" height="50" viewBox="0 0 70 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 15C15 10 25 20 35 15C45 10 55 20 65 15" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
          <path d="M5 30C15 25 25 35 35 30C45 25 55 35 65 30" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </motion.div>

      {/* Decorative Circles - Bottom Left - CORNER ONLY */}
      <motion.div 
        style={{ x: x1, y: y1 }}
        className="absolute bottom-12 left-12 md:bottom-16 md:left-20 opacity-12"
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="15" stroke="#10b981" strokeWidth="2"/>
          <circle cx="40" cy="40" r="15" stroke="#10b981" strokeWidth="2"/>
        </svg>
      </motion.div>

      {/* Decorative Curved Line - Bottom Right - CORNER ONLY */}
      <motion.div 
        style={{ x: x2, y: y2 }}
        className="absolute bottom-12 right-12 md:bottom-16 md:right-20 opacity-12"
      >
        <svg width="80" height="50" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 30 Q 25 10, 45 30 T 85 30" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      </motion.div>

      {/* Header Content */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center container mx-auto px-4"
      >
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
          {title}
        </h1>

        {/* Breadcrumb */}
        {showBreadcrumb && (
          <div className="flex items-center justify-center gap-2 text-gray-600 mt-6">
            {onBack && (
              <>
                <button 
                  onClick={onBack}
                  className="flex items-center gap-1 hover:text-emerald-600 transition-colors font-medium"
                >
                  <HomeIcon className="w-4 h-4" />
                  <span>الرئيسية</span>
                </button>
                <ChevronLeft className="w-4 h-4" />
              </>
            )}
            <span className="text-gray-900 font-medium">{breadcrumb || title}</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}