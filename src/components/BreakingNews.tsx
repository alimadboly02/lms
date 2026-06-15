export function BreakingNews() {
  return (
    <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 py-2 overflow-hidden w-full shadow-lg">
      {/* Decorative Elements */}
      {/* Top Left Dots */}
      <div className="absolute top-8 right-16 w-20 h-20 grid grid-cols-6 gap-1 opacity-30">
        {Array.from({ length: 36 }).map((_, i) => (
          <div
            key={`tl-${i}`}
            className={`w-1 h-1 rounded-full ${
              i % 3 === 0
                ? "bg-white"
                : i % 2 === 0
                  ? "bg-red-300"
                  : "bg-red-400"
            }`}
          />
        ))}
      </div>

      {/* Bottom Right Dots */}
      <div className="absolute bottom-8 left-24 w-16 h-16 grid grid-cols-5 gap-1 opacity-30">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={`br-${i}`}
            className={`w-1 h-1 rounded-full ${
              i % 2 === 0 ? "bg-white" : "bg-red-300"
            }`}
          />
        ))}
      </div>

      {/* Wavy Lines */}
      <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2">
        <svg
          width="60"
          height="40"
          viewBox="0 0 60 40"
          className="text-white/20"
        >
          <path
            d="M0 20 Q8 12, 16 20 T32 20 T48 20 T60 20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Small Circles */}
      <div className="absolute top-1/3 left-1/3 w-12 h-12 border-4 border-white/15 rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-white/15 rounded-full"></div>

      {/* Scrolling News - Full Width */}
      <div className="relative">
        {/* News Container */}
        <div className="overflow-hidden py-3">
          <div className="animate-marquee-rtl whitespace-nowrap flex gap-12 px-4">
            <div className="inline-flex items-center gap-3">
              <span className="text-3xl">🎓</span>
              <span className="text-white font-bold text-xl drop-shadow-md">
                افتتاح التسجيل للفصل الدراسي الجديد - سارع بالحجز الآن للحصول على أفضل المقاعد والمواعيد المناسبة لك!
              </span>
            </div>
            
            <div className="inline-flex items-center gap-3">
              <span className="text-3xl">⭐</span>
              <span className="text-white font-bold text-xl drop-shadow-md">
                تهانينا الحارة لطلابنا المتفوقين الذين حققوا علامات كاملة في امتحانات التوجيهي وأثبتوا تميزهم وإصرارهم على النجاح!
              </span>
            </div>
            
            <div className="inline-flex items-center gap-3">
              <span className="text-3xl">📚</span>
              <span className="text-white font-bold text-xl drop-shadow-md">
                دورات تحضيرية مكثفة للامتحانات النهائية متاحة الآن - برنامج شامل يغطي جميع الوحدات والقواعد مع أسئلة وزارية محلولة!
              </span>
            </div>
            
            <div className="inline-flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <span className="text-white font-bold text-xl drop-shadow-md">
                <span className="text-yellow-200 font-extrabold text-2xl">خصم خاص 20%</span> على جميع الدورات للتسجيل المبكر - العرض محدود حتى نهاية الشهر فقط!
              </span>
            </div>
            
            <div className="inline-flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              <span className="text-white font-bold text-xl drop-shadow-md">
                انضم إلى أكثر من 1000 طالب متفوق حققوا أحلامهم بالحصول على العلامات الكاملة والالتحاق بأفضل الجامعات بفضل منهجية الدكتور خالد الدعجة المتميزة!
              </span>
            </div>

            {/* Duplicate for seamless loop */}
            <div className="inline-flex items-center gap-3">
              <span className="text-3xl">🎓</span>
              <span className="text-white font-bold text-xl drop-shadow-md">
                افتتاح التسجيل للفصل الدراسي الجديد - سارع بالحجز الآن للحصول على أفضل المقاعد والمواعيد المناسبة لك!
              </span>
            </div>
            
            <div className="inline-flex items-center gap-3">
              <span className="text-3xl">⭐</span>
              <span className="text-white font-bold text-xl drop-shadow-md">
                تهانينا الحارة لطلابنا المتفوقين الذين حققوا علامات كاملة في امتحانات التوجيهي وأثبتوا تميزهم وإصرارهم على النجاح!
              </span>
            </div>
            
            <div className="inline-flex items-center gap-3">
              <span className="text-3xl">📚</span>
              <span className="text-white font-bold text-xl drop-shadow-md">
                دورات تحضيرية مكثفة للامتحانات النهائية متاحة الآن - برنامج شامل يغطي جميع الوحدات والقواعد مع أسئلة وزارية محلولة!
              </span>
            </div>
            
            <div className="inline-flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <span className="text-white font-bold text-xl drop-shadow-md">
                <span className="text-yellow-200 font-extrabold text-2xl">خصم خاص 20%</span> على جميع الدورات للتسجيل المبكر - العرض محدود حتى نهاية الشهر فقط!
              </span>
            </div>
            
            <div className="inline-flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              <span className="text-white font-bold text-xl drop-shadow-md">
                انضم إلى أكثر من 1000 طالب متفوق حققوا أحلامهم بالحصول على العلامات الكاملة والالتحاق بأفضل الجامعات بفضل منهجية الدكتور خالد الدعجة المتميزة!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}