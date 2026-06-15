import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Category, SubCategory } from "../types";

const categories: Category[] = [
  { id: "2008", title: "توجيهي 2008", emoji: "🎓", color: "emerald" },
  { id: "2009", title: "توجيهي 2009", emoji: "📚", color: "rose" },
];

const subCategories: SubCategory[] = [
  { id: 1, title: "الخطط الدراسية", icon: "📅", color: "emerald" },
  { id: 2, title: "الإملائيات", icon: "✍️", color: "yellow" },
  { id: 3, title: "الامتحانات والاختبارات", icon: "📋", color: "blue" },
  { id: 4, title: "PDF", icon: "📄", color: "rose" },
  { id: 5, title: "مراجعات الوحدات", icon: "📝", color: "purple" },
  { id: 6, title: "خلاصات القطع", icon: "📖", color: "teal" },
  { id: 7, title: "التسجيلات الصوتية", icon: "🎧", color: "orange" },
];

interface CategoriesProps {
  onSubcategoryClick: (subcategory: SubCategory) => void;
  expandedCategory?: string | null;
}

export function Categories({
  onSubcategoryClick,
  expandedCategory,
}: CategoriesProps) {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  // Auto-expand category when expandedCategory prop changes
  useEffect(() => {
    if (expandedCategory) {
      setSelectedYear(expandedCategory);
    }
  }, [expandedCategory]);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            الأقسام المتوفرة
          </h2>

          {/* Decorative Underline */}
          <div className="flex items-center justify-center mb-4">
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"></div>
          </div>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            اختر الجيل المناسب لك وابدأ رحلتك التعليمية مع الدكتور خالد الدعجة
            للوصول إلى أعلى الدرجات
          </p>
        </motion.div>

        {/* Categories Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              id={`category-${category.id}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              onClick={() =>
                setSelectedYear(
                  selectedYear === category.id ? null : category.id,
                )
              }
              className={`group relative rounded-2xl cursor-pointer transition-all duration-300
                shadow-lg hover:shadow-xl hover:-translate-y-1 overflow-hidden
                ${
                  category.color === "emerald"
                    ? "bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-500"
                    : "bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-500"
                }
              `}
            >
              {/* Decorative Pattern Background */}
              <div className="absolute inset-0 opacity-20">
                {/* Wave Patterns */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <pattern
                      id={`wave-${category.id}`}
                      x="0"
                      y="0"
                      width="100"
                      height="100"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle
                        cx="20"
                        cy="20"
                        r="30"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        opacity="0.3"
                      />
                      <circle
                        cx="80"
                        cy="60"
                        r="40"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        opacity="0.3"
                      />
                      <path
                        d="M0,50 Q25,30 50,50 T100,50"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        opacity="0.4"
                      />
                      <circle
                        cx="50"
                        cy="80"
                        r="15"
                        fill="white"
                        opacity="0.2"
                      />
                      <circle
                        cx="10"
                        cy="70"
                        r="8"
                        fill="white"
                        opacity="0.3"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    fill={`url(#wave-${category.id})`}
                  />
                </svg>
              </div>

              <div className="relative p-6">
                <div className="flex items-center gap-6">
                  {/* Icon without circle */}
                  <div className="text-5xl">{category.emoji}</div>

                  {/* Text */}
                  <div className="flex-1 text-right">
                    <p className="text-sm text-white/80 mb-1">
                      اختر لجيل الدراسي
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      {category.title}
                    </h3>
                  </div>

                  {/* Arrow */}
                  <div
                    className={`h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 border-2 border-white/40
                      ${selectedYear === category.id ? "rotate-180" : "group-hover:-translate-x-1"}
                    `}
                  >
                    <ChevronDown className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subcategories Section */}
        <AnimatePresence>
          {selectedYear && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-12 relative"
            >
              {/* Decorative Background Similar to Header */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-emerald-50 rounded-2xl -z-10"></div>

              {/* Decorative Elements - White/Transparent only */}
              {/* Top Right Dots Pattern */}
              <div className="absolute top-6 right-8 w-16 h-16 grid grid-cols-5 gap-0.5 opacity-20">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={`tr-${i}`}
                    className="w-1 h-1 rounded-full bg-gray-400"
                  />
                ))}
              </div>

              {/* Top Left Circles */}
              <div className="absolute top-8 left-12 w-20 h-20 opacity-15">
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle
                    cx="20"
                    cy="20"
                    r="15"
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="2"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Bottom Right Wavy Lines */}
              <div className="absolute bottom-8 right-12 opacity-20">
                <svg width="100" height="60" viewBox="0 0 100 60">
                  <path
                    d="M0,30 Q15,15 30,30 T60,30 T90,30"
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="3"
                  />
                  <path
                    d="M10,45 Q25,35 40,45 T70,45"
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Bottom Left Circle */}
              <div className="absolute bottom-12 left-8 w-12 h-12 rounded-full bg-gray-300 opacity-20"></div>

              {/* Middle Right Dashed Circle */}
              <div className="absolute top-1/2 right-20 w-16 h-16 border-3 border-dashed border-gray-400 rounded-full opacity-15"></div>

              {/* Middle Left Small Dots */}
              <div className="absolute top-1/3 left-24 w-10 h-10 grid grid-cols-4 gap-1 opacity-20">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={`ml-${i}`}
                    className="w-0.5 h-0.5 rounded-full bg-gray-400"
                  />
                ))}
              </div>

              {/* Top Center Wave */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 opacity-15">
                <svg width="80" height="30" viewBox="0 0 80 30">
                  <path
                    d="M0,15 Q10,5 20,15 T40,15 T60,15 T80,15"
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              <div className="relative p-6 md:p-8">
                {/* Section Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-center mb-10"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                    محتويات{" "}
                    {categories.find((c) => c.id === selectedYear)?.title}
                  </h3>
                  <div className="flex justify-center mb-3">
                    <div className="h-0.5 w-20 bg-emerald-500"></div>
                  </div>
                  <p className="text-gray-600">
                    اختر القسم الذي تريد الوصول إليه
                  </p>
                </motion.div>

                {/* Subcategories Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {subCategories.length === 0 && (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-500">لا توجد أقسام متاحة حالياً</p>
                    </div>
                  )}
                  {subCategories.map((subCategory, index) => (
                    <motion.div
                      key={subCategory.id}
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        delay: 0.3 + index * 0.05,
                        duration: 0.4,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 cursor-pointer border-2 border-transparent hover:border-emerald-400"
                      onClick={() => onSubcategoryClick(subCategory)}
                    >
                      <div className="flex flex-col items-center text-center gap-2">
                        {/* Icon with 3D effect */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-emerald-200 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
                          <div className="relative text-4xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                            {subCategory.icon}
                          </div>
                        </div>

                        {/* Title */}
                        <h4 className="text-sm font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                          {subCategory.title}
                        </h4>

                        {/* Divider */}
                        <div className="h-px w-12 bg-gradient-to-r from-transparent via-emerald-300 to-transparent"></div>

                        {/* CTA */}
                        <span className="text-xs text-gray-500 group-hover:text-emerald-600 font-medium">
                          ادخل →
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
