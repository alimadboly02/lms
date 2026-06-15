import { ArrowLeft, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, useMotionValue, useTransform } from "motion/react";
import teacherImage from "@/assets/84b3b88fbb16d0f44913b572c2cd51f997381590.png";
import { MouseEvent } from "react";

export function Header() {
  // Mouse tracking for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Transform values for decorative elements (full movement)
  const x1 = useTransform(mouseX, [-0.5, 0.5], [-25, 25]);
  const y1 = useTransform(mouseY, [-0.5, 0.5], [-25, 25]);
  const x2 = useTransform(mouseX, [-0.5, 0.5], [20, -20]);
  const y2 = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
  const x3 = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const y3 = useTransform(mouseY, [-0.5, 0.5], [-15, 15]);
  const x4 = useTransform(mouseX, [-0.5, 0.5], [10, -10]);
  const y4 = useTransform(mouseY, [-0.5, 0.5], [10, -10]);

  // Transform values for image (only horizontal and down)
  const imgX = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const imgY = useTransform(mouseY, [-0.5, 0.5], [0, 20]); // Only down, not up

  return (
    <header
      className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-hidden pt-8 md:pt-12 pb-0"
      onMouseMove={handleMouseMove}
    >
      {/* Decorative Elements */}
      {/* Top Right Dots */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ x: x1, y: y1 }}
        className="absolute top-32 left-20 w-28 h-28 grid grid-cols-7 gap-1.5"
      >
        {Array.from({ length: 49 }).map((_, i) => (
          <div
            key={`tr-${i}`}
            className="w-1.5 h-1.5 rounded-full bg-emerald-300"
          />
        ))}
      </motion.div>

      {/* Bottom Right Dots */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{ x: x2, y: y2 }}
        className="absolute bottom-32 left-32 w-24 h-24 grid grid-cols-6 gap-1.5"
      >
        {Array.from({ length: 36 }).map((_, i) => (
          <div
            key={`br-${i}`}
            className="w-1.5 h-1.5 rounded-full bg-teal-300"
          />
        ))}
      </motion.div>

      {/* Top Left Dots */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ x: x3, y: y3 }}
        className="absolute top-44 right-32 w-20 h-20 grid grid-cols-5 gap-1.5"
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={`tl-${i}`}
            className="w-1.5 h-1.5 rounded-full bg-green-300"
          />
        ))}
      </motion.div>

      {/* Wavy Lines */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{ x: x4, y: y4 }}
        className="absolute top-48 left-1/3"
      >
        <svg
          width="80"
          height="50"
          viewBox="0 0 80 50"
          className="text-emerald-300"
        >
          <path
            d="M0 25 Q10 15, 20 25 T40 25 T60 25 T80 25"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M0 35 Q10 25, 20 35 T40 35 T60 35 T80 35"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Dashed Circle - Top Left */}
      <motion.div
        initial={{ opacity: 0, rotate: -180 }}
        animate={{ opacity: 0.4, rotate: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        style={{ x: x1, y: y1 }}
        className="absolute top-1/3 left-1/4 w-32 h-32 border-8 border-dashed border-emerald-300 rounded-full"
      ></motion.div>

      {/* Solid Circle - Bottom Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        style={{ x: x2, y: y2 }}
        className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-teal-300 rounded-full"
      ></motion.div>

      {/* Yellow Circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        style={{ x: x3, y: y3 }}
        className="absolute top-1/2 right-1/3 w-16 h-16 bg-green-300 rounded-full"
      ></motion.div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center relative z-10">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-2 md:order-1"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-cairo text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight"
            >
              انضم لـ <span className="text-rose-500">1000+</span>
              <br />
              طالب متفوق مع
              <br />
              الدكتور خالد الدعجة
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-lg"
            >
              خبرة طويلة في تدريس اللغة الإنجليزية لطلاب التوجيهي بأسلوب مبتكر
              يضمن لك الفهم العميق والنتائج المتميزة
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-[5px] font-semibold text-lg transition-all duration-300 hover:shadow-xl inline-flex items-center gap-3 group relative overflow-hidden"
            >
              {/* عناصر الخلفية الزخرفية */}
              <div className="absolute inset-0 overflow-hidden">
                {/* دوائر فارغة */}
                <div className="absolute -top-4 -right-4 w-16 h-16 border-2 border-white/20 rounded-full"></div>
                <div className="absolute top-1/2 -left-6 w-20 h-20 border-2 border-white/15 rounded-full"></div>
                <div className="absolute -bottom-3 right-1/3 w-12 h-12 border border-white/10 rounded-full"></div>

                {/* نقاط صغيرة */}
                <div className="absolute top-2 left-8 w-1.5 h-1.5 bg-white/30 rounded-full"></div>
                <div className="absolute top-6 left-16 w-1 h-1 bg-white/25 rounded-full"></div>
                <div className="absolute bottom-4 right-12 w-1.5 h-1.5 bg-white/30 rounded-full"></div>
                <div className="absolute bottom-2 right-20 w-1 h-1 bg-white/20 rounded-full"></div>

                {/* خطوط منحنية */}
                <svg
                  className="absolute -bottom-2 -left-4 opacity-15"
                  width="80"
                  height="40"
                  viewBox="0 0 80 40"
                >
                  <path
                    d="M0,20 Q20,10 40,20 T80,20"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>

              <span className="relative z-10">ابدأ رحلتك للتفوق</span>
              <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </motion.button>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="relative order-1 md:order-2"
          >
            {/* Image with Parallax - Only horizontal and down */}
            <motion.div
              style={{ x: imgX, y: imgY }}
              className="relative max-w-2xl mx-auto flex items-end justify-center min-h-[320px] sm:min-h-[360px] md:min-h-[440px] lg:min-h-[500px]"
            >
              <ImageWithFallback
                src={teacherImage}
                alt="الدكتور خالد الدعجة"
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
