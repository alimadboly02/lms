import { motion } from "motion/react";

interface Student {
  id: number;
  name: string;
  points: number;
  rank: number;
}

const topStudents: Student[] = [
  { id: 1, name: "محمد أحمد العلي", points: 2450, rank: 1 },
  { id: 2, name: "سارة خالد الحسن", points: 2380, rank: 2 },
  { id: 3, name: "عمر يوسف المحمود", points: 2310, rank: 3 },
  { id: 4, name: "نور الدين سامي", points: 2240, rank: 4 },
  { id: 5, name: "ليلى محمود الخطيب", points: 2180, rank: 5 },
];

export function Leaderboard() {
  // ترتيب الطلاب: الثاني، الأول (بالمنتصف)، الثالث
  const podiumOrder = [
    topStudents[1], // المركز الثاني - على اليمين
    topStudents[0], // المركز الأول - في المنتصف
    topStudents[2], // المركز الثالث - على اليسار
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/40 relative overflow-hidden">
      {/* Decorative Elements - Subtle */}
      <div className="absolute top-8 right-12 w-20 h-20 grid grid-cols-6 gap-0.5 opacity-10">
        {Array.from({ length: 36 }).map((_, i) => (
          <div
            key={`tr-${i}`}
            className="w-1 h-1 rounded-full bg-emerald-300"
          />
        ))}
      </div>

      <div className="absolute top-12 left-16 opacity-8">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle
            cx="30"
            cy="30"
            r="20"
            fill="none"
            stroke="#6ee7b7"
            strokeWidth="2"
          />
          <circle
            cx="60"
            cy="60"
            r="25"
            fill="none"
            stroke="#6ee7b7"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="absolute bottom-12 left-20 opacity-10">
        <svg width="120" height="60" viewBox="0 0 120 60">
          <path
            d="M0,30 Q20,15 40,30 T80,30 T120,30"
            fill="none"
            stroke="#6ee7b7"
            strokeWidth="3"
          />
        </svg>
      </div>

      <div className="absolute bottom-16 right-16 w-16 h-16 rounded-full bg-emerald-200 opacity-10"></div>

      <div className="container mx-auto px-4 relative">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-3">
            <div className="text-4xl">🏆</div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            صدارة الطلاب المتفوقين
          </h2>

          <div className="flex items-center justify-center mb-3">
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-md"></div>
          </div>

          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            تهانينا الحارة لطلابنا الذين حققوا أعلى النقاط
            وأثبتوا تميزهم وإصرارهم على النجاح
          </p>
        </motion.div>

        {/* Top 3 Students - Podium Design */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex items-end justify-center gap-4 md:gap-8">
            {podiumOrder.map((student, index) => {
              const isFirst = student.rank === 1;
              const isSecond = student.rank === 2;
              const isThird = student.rank === 3;

              return (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 100, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.15,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className={`relative flex flex-col items-center transition-all duration-500 hover:scale-105
                    ${isFirst ? "w-full max-w-xs" : "w-full max-w-[260px]"}
                  `}
                >
                  {/* 3D Card Container */}
                  <div
                    className="relative w-full rounded-md overflow-hidden transition-all duration-300"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Outer Glow */}
                    <div
                      className={`absolute -inset-1 rounded-md blur-xl opacity-50
                      ${
                        isFirst
                          ? "bg-gradient-to-br from-emerald-400 via-teal-400 to-emerald-500"
                          : "bg-gradient-to-br from-emerald-300 to-teal-300"
                      }
                    `}
                    ></div>

                    {/* Main Card */}
                    <div className="relative bg-white rounded-md shadow-2xl overflow-hidden">
                      {/* Top Section with Gradient */}
                      <div
                        className={`relative px-6 pt-8 pb-6
                          ${
                            isFirst
                              ? "bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600"
                              : "bg-gradient-to-br from-emerald-300 via-teal-400 to-emerald-500"
                          }
                        `}
                      >
                        {/* Shine Effect */}
                        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-60"></div>

                        {/* Decorative Circles */}
                        <div className="absolute inset-0 overflow-hidden opacity-20">
                          <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white rounded-full"></div>
                          <div className="absolute bottom-2 left-2 w-12 h-12 border-2 border-white rounded-full"></div>
                          <div className="absolute top-1/2 left-1/2 w-20 h-20 border border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                        </div>

                        <div className="relative text-center">
                          {/* Medal Badge - أكبر وفي منتصف دائرة */}
                          <div className="mb-4 flex justify-center">
                            <div
                              className={`inline-flex items-center justify-center rounded-full bg-white/25 backdrop-blur-sm border-3 border-white/60 shadow-2xl
                              ${isFirst ? "w-28 h-28" : "w-24 h-24"}
                            `}
                            >
                              <span
                                className={`
                                ${isFirst ? "text-6xl" : "text-5xl"}
                              `}
                              >
                                {student.rank === 1
                                  ? "🥇"
                                  : student.rank === 2
                                    ? "🥈"
                                    : "🥉"}
                              </span>
                            </div>
                          </div>

                          {/* Student Name */}
                          <h3
                            className={`font-bold text-white mb-3 drop-shadow-lg
                            ${isFirst ? "text-lg" : "text-base"}
                          `}
                          >
                            {student.name}
                          </h3>
                        </div>
                      </div>

                      {/* Bottom Section - Points */}
                      <div className="relative py-5 px-6 bg-white">
                        {/* Decorative Top Border */}
                        <div
                          className={`absolute top-0 left-0 right-0 h-1
                          ${
                            isFirst
                              ? "bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600"
                              : "bg-gradient-to-r from-emerald-300 via-teal-400 to-emerald-500"
                          }
                        `}
                        ></div>

                        <div className="text-center">
                          <p className="text-gray-500 text-xs mb-2 uppercase tracking-wider">
                            إجمالي النقاط
                          </p>
                          <div
                            className={`font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent
                            ${isFirst ? "text-3xl" : "text-2xl"}
                          `}
                          >
                            {student.points}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 3D Podium Base - رقم المركز هنا */}
                    <div className="relative">
                      <div
                        className={`relative overflow-hidden
                          ${
                            isFirst
                              ? "h-20 bg-gradient-to-b from-emerald-500 to-emerald-700"
                              : isSecond
                                ? "h-14 bg-gradient-to-b from-emerald-400 to-emerald-600"
                                : "h-12 bg-gradient-to-b from-emerald-300 to-emerald-500"
                          }
                        `}
                        style={{
                          clipPath:
                            "polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)",
                        }}
                      >
                        {/* Top Highlight */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-white/30"></div>

                        {/* Rank Number on Podium */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className={`font-bold text-white drop-shadow-lg
                            ${isFirst ? "text-5xl" : isSecond ? "text-4xl" : "text-3xl"}
                          `}
                          >
                            {student.rank}
                          </span>
                        </div>

                        {/* Bottom Shadow */}
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/20"></div>
                      </div>

                      {/* Ground Shadow */}
                      <div className="h-1.5 bg-gradient-to-b from-gray-300/40 to-transparent blur-sm"></div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}