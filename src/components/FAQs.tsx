import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import image1 from "figma:asset/1880eab9ed7f77e718524c85ee4f38d38e15dd17.png";
import image2 from "figma:asset/4ce8a440146c085a232ae7756860d9a2dbc463e7.png";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "كيف يمكنني التسجيل في الدورة؟",
    answer:
      "يمكنك التسجيل بسهولة عن طريق التواصل معنا مباشرة أو من خلال زيارة مركزنا. سيكون لديك وصول غير محدود إلى جميع المواد التعليمية طوال فترة الدورة.",
  },
  {
    id: 2,
    question:
      "هل يمكنني الوصول إلى المواد على الأجهزة المحمولة؟",
    answer:
      "نعم بالتأكيد! جميع المواد التعليمية متاحة على جميع الأجهزة (الهاتف، التابلت، الكمبيوتر) ويمكنك الوصول إليها في أي وقت ومن أي مكان.",
  },
  {
    id: 3,
    question: "كم من الوقت لدي للوصول إلى محتوى الدورة؟",
    answer:
      "لديك وصول كامل إلى جميع المواد طوا�� الفصل الدراسي حتى موعد الامتحان النهائي، مما يتيح لك المراجعة والدراسة بالوتيرة التي تناسبك.",
  },
  {
    id: 4,
    question:
      "ماذا لو احتجت مساعدة أو كان لدي أسئلة خلال الدورة؟",
    answer:
      "الدكتور خالد الدعجة متواجد دائماً للإجابة على جميع استفساراتك. يمكنك طرح الأسئلة خلال الحصص أو عبر وسائل التواصل المتاحة، ونحن ملتزمون بدعمك في كل خطوة.",
  },
  {
    id: 5,
    question:
      "هل تقدمون استرداد الأموال إذا لم أكن راضياً عن الدورة؟",
    answer:
      "نحن واثقون من جودة دوراتنا وملتزمون برضاك التام. إذا كانت لديك أي مخاوف، يرجى التواصل معنا لمناقشة الحلول المناسبة.",
  },
];

export function FAQs() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(1);

  return (
    <section className="py-16 relative bg-gray-50 overflow-hidden">
      {/* Decorative Dots Pattern */}
      <div className="absolute inset-0 opacity-30">
        {/* Top dots pattern */}
        <div className="absolute top-20 right-1/4 w-48 h-32">
          {Array.from({ length: 120 }).map((_, i) => (
            <div
              key={`dot-top-${i}`}
              className="absolute w-1 h-1 bg-gray-400 rounded-full"
              style={{
                left: `${(i % 20) * 12}px`,
                top: `${Math.floor(i / 20) * 12}px`,
              }}
            />
          ))}
        </div>

        {/* Middle dots pattern */}
        <div className="absolute top-1/2 left-1/3 w-64 h-24 transform -translate-y-1/2">
          {Array.from({ length: 160 }).map((_, i) => (
            <div
              key={`dot-mid-${i}`}
              className="absolute w-1 h-1 bg-gray-400 rounded-full"
              style={{
                left: `${(i % 32) * 8}px`,
                top: `${Math.floor(i / 32) * 8}px`,
              }}
            />
          ))}
        </div>

        {/* Bottom dots pattern */}
        <div className="absolute bottom-32 right-1/3 w-56 h-20">
          {Array.from({ length: 140 }).map((_, i) => (
            <div
              key={`dot-bot-${i}`}
              className="absolute w-1 h-1 bg-gray-400 rounded-full"
              style={{
                left: `${(i % 28) * 8}px`,
                top: `${Math.floor(i / 28) * 10}px`,
              }}
            />
          ))}
        </div>

        {/* Extra scattered dots */}
        <div className="absolute top-1/3 left-1/4 w-40 h-16">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={`dot-extra-${i}`}
              className="absolute w-1 h-1 bg-gray-400 rounded-full"
              style={{
                left: `${(i % 20) * 8}px`,
                top: `${Math.floor(i / 20) * 10}px`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* FAQs Content */}
          <div>
            {/* Main Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
            >
              اعثر على إجابات لأسئلتك
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-600 text-lg mb-8 leading-relaxed"
            >
              مرحباً بك في قسم الأسئلة الشائعة! هنا قمنا بجمع
              إجابات لبعض الأسئلة الأكثر شيوعاً التي يطرحها
              طلابنا.
            </motion.p>

            {/* FAQ Items */}
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="rounded-[5px] overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenFaqId(
                        openFaqId === faq.id ? null : faq.id,
                      )
                    }
                    className={`w-full px-6 py-5 flex items-center justify-between transition-all duration-300 rounded-[5px] ${
                      openFaqId === faq.id
                        ? "bg-emerald-500 text-white shadow-lg"
                        : "bg-white text-gray-800 hover:bg-gray-50 shadow-sm"
                    }`}
                  >
                    <span className="font-semibold flex-1 text-right">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0 mr-4">
                      {openFaqId === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-white" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                  </button>
                  {openFaqId === faq.id && (
                    <div className="px-6 py-5 bg-white border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Images Section - صور متداخلة فوق بعض */}
          <div className="relative mt-12 md:mt-0">
            {/* حاوية تعطي ارتفاع ثابت */}
            <div className="relative h-[520px] w-full">
              {/* الصورة الخلفية */}
              <motion.div
                initial={{ opacity: 0, x: -40, rotate: -5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute top-0 -left-2 md:-left-6 w-[78%] md:w-[70%]"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={image1}
                    alt="طالب يدرس بتركيز"
                    className="w-full h-[320px] md:h-[340px] object-cover"
                  />
                  {/* black overlay */}
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </motion.div>

              {/* الصورة الأمامية */}
              <motion.div
                initial={{ opacity: 0, x: 40, rotate: 5 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute top-[220px] right-0 w-[92%] md:w-[88%]"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={image2}
                    alt="الدكتور خالد - مرشدك في اللغة الإنجليزية"
                    className="w-full h-[280px] md:h-[300px] object-cover"
                  />
                  {/* black overlay */}
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}