import { Check, Play, Award } from "lucide-react";
import { motion } from "framer-motion";
import drKhaledImage from "figma:asset/56c62f321f4d0650710ac36e0c87e902fe5a63d0.png";

export function AboutUs() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-emerald-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            من نحن
          </h2>
          <div className="w-24 h-1 bg-emerald-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Right Side - Images (يظهر على اليمين في RTL) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative order-2 lg:order-1"
          >
            {/* Decorative Dots Grid - Top Left */}
            <div className="absolute -top-8 -right-8 w-20 h-20 grid grid-cols-6 gap-1.5 opacity-50">
              {Array.from({ length: 36 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i % 4 === 0
                      ? "bg-emerald-500"
                      : i % 3 === 0
                        ? "bg-rose-500"
                        : i % 2 === 0
                          ? "bg-purple-500"
                          : "bg-yellow-500"
                  }`}
                />
              ))}
            </div>

            {/* Decorative Dots Grid - Bottom Right */}
            <div className="absolute -bottom-4 -left-4 w-16 h-16 grid grid-cols-5 gap-1.5 opacity-40">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i % 3 === 0
                      ? "bg-emerald-400"
                      : i % 2 === 0
                        ? "bg-rose-400"
                        : "bg-purple-400"
                  }`}
                />
              ))}
            </div>

            {/* Decorative Circle - Top Right */}
            <div className="absolute top-12 -left-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>

            {/* Decorative Circle - Bottom Left */}
            <div className="absolute bottom-16 right-8 w-16 h-16 border-4 border-dashed border-emerald-400 rounded-full opacity-30"></div>

            {/* Main Image */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={drKhaledImage}
                alt="الدكتور خالد الدعجة"
                className="w-full h-[500px] object-cover"
              />
            </div>

            {/* Awards Card - Bottom Left (overlapping) */}
            <div className="absolute -bottom-6 right-8 z-20 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded shadow-2xl p-4 min-w-[180px] overflow-hidden">
              {/* خلفية عناصر خفيفة */}
              <div className="absolute inset-0 opacity-10">
                {/* نقاط صغيرة */}
                <div className="absolute top-2 right-3 w-16 h-16 grid grid-cols-4 gap-1">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={`dot-${i}`}
                      className="w-1 h-1 rounded-full bg-white"
                    />
                  ))}
                </div>
                
                {/* دوائر */}
                <div className="absolute bottom-2 left-2 w-12 h-12 rounded-full border-2 border-white/30"></div>
                <div className="absolute top-1/2 left-1/3 w-8 h-8 rounded-full border-2 border-white/20"></div>
              </div>
              
              <div className="text-center text-white relative z-10">
                <div className="text-3xl font-bold">20+</div>
                <div className="text-xs text-emerald-100 font-medium tracking-wide mt-1">
                  عامًا من الخبرة
                </div>
              </div>
            </div>
          </motion.div>

          {/* Left Side - Content (يظهر على اليسار في RTL) */}
          <div className="order-1 lg:order-2 text-right">
            {/* Main Title */}
            <motion.h3
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight"
            >
              تعلم واصقل مهاراتك من{" "}
              <span className="text-emerald-600 relative inline-block">
                أي مكان
                {/* Decorative Underline */}
                <svg
                  className="absolute -bottom-2 right-0 w-full"
                  viewBox="0 0 200 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 7 Q50 2, 100 7 T198 7"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    className="text-emerald-400"
                  />
                </svg>
              </span>
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-gray-600 text-lg mb-8 leading-relaxed"
            >
              مع الدكتور خالد الدعجة، استمتع بخبرة تدريسية تمتد
              لأكثر من 20 عامًا في تعليم اللغة الإنجليزية لطلاب
              التوجيهي. نقدم لك محتوى تعليمي شامل ومنظم يضمن لك
              التفوق والوصول إلى أعلى الدرجات.
            </motion.p>

            {/* Features List */}
            <div className="space-y-4" dir="rtl">
              {[
                "مدرسون خبراء ومحترفون",
                "تعلم عن بعد بكل سهولة",
                "وصول دائم للمحتوى التعليمي",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check
                      className="w-5 h-5 text-emerald-600"
                      strokeWidth={3}
                    />
                  </div>
                  <span className="text-gray-700 font-medium text-lg">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}