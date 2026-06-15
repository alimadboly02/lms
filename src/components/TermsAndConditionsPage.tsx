import { motion, useMotionValue, useTransform } from 'motion/react';
import { Home as HomeIcon, ChevronLeft } from 'lucide-react';
import logoImage from "figma:asset/9fb5bb008cfa075620dedaf2d6ee1171c8069760.png";
import { PageHeader } from './PageHeader';

interface TermsAndConditionsPageProps {
  onBack: () => void;
}

export function TermsAndConditionsPage({ onBack }: TermsAndConditionsPageProps) {
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

  // Transform values for parallax
  const x1 = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  const y1 = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);
  const x2 = useTransform(mouseX, [-0.5, 0.5], [15, -15]);
  const y2 = useTransform(mouseY, [-0.5, 0.5], [15, -15]);

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Page Header with Animations */}
      <PageHeader 
        title="الشروط والأحكام"
        breadcrumb="الشروط والأحكام"
        onBack={onBack}
        showBreadcrumb={true}
      />

      {/* Main Content - Simple Text */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Section 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            مقدمة
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            مرحباً بك في منصة الدكتور خالد الدعجة التعليمية. باستخدامك لهذه المنصة، فإنك توافق على 
            الالتزام بهذه الشروط والأحكام. يرجى قراءة هذه الشروط بعناية قبل استخدام المنصة. إذا كنت 
            لا توافق على أي من هذه الشروط، يجب عليك عدم استخدام المنصة.
          </p>
          <p className="text-gray-700 leading-relaxed">
            هذه الشروط والأحكام تحكم استخدامك للمنصة وجميع الخدمات والمحتوى التعليمي المقدم من خلالها. 
            نحن نحتفظ بالحق في تعديل هذه الشروط في أي وقت، وسيتم إشعارك بأي تغييرات جوهرية. استمرارك 
            في استخدام المنصة بعد التعديلات يعني موافقتك على الشروط الجديدة.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12 "
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            التسجيل واستخدام الحساب
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            للوصول إلى محتوى المنصة التعليمي، يجب عليك إنشاء حساب شخصي بتقديم معلومات دقيقة وكاملة، 
            بما في ذلك الاسم، رقم الهاتف، المدينة، والجيل الدراسي. أنت مسؤول عن الحفاظ على سرية كلمة 
            المرور الخاصة بك وعن جميع الأنشطة التي تحدث تحت حسابك.
          </p>
          <p className="text-gray-700 leading-relaxed">
            يجب عليك إخطارنا فوراً بأي استخدام غير مصرح به لحسابك أو أي خرق أمني آخر. نحن غير 
            مسؤولين عن أي خسارة أو ضرر ناتج عن فشلك في الامتثال لهذا القسم. يجب أن تكون في سن 
            قانوني لاستخدام المنصة، أو أن تحصل على إذن من ولي أمرك إذا كنت قاصراً.
          </p>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            الخدمات التعليمية
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            توفر المنصة مجموعة متنوعة من الخدمات التعليمية لطلاب التوجيهي، بما في ذلك الخطط الدراسية، 
            الإملائيات، الامتحانات والاختبارات، ملفات PDF، مراجعات الوحدات، خلاصات القطع، والتسجيلات 
            الصوتية. جميع المحتوى التعليمي هو ملكية حصرية للدكتور خالد الدعجة ومحمي بحقوق النشر.
          </p>
          <p className="text-gray-700 leading-relaxed">
            يُمنح لك حق محدود وغير حصري وغير قابل للنقل لاستخدام المحتوى لأغراض التعلم الشخصي فقط. 
            لا يجوز لك نسخ أو توزيع أو تعديل أو بيع أو نشر أي جزء من المحتوى التعليمي دون إذن كتابي 
            صريح منا. أي انتهاك لهذه الشروط قد يؤدي إلى اتخاذ إجراءات قانونية.
          </p>
        </motion.div>

        {/* Section 4 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            حقوق الملكية الفكرية
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            جميع المحتويات الموجودة على المنصة، بما في ذلك على سبيل المثال لا الحصر: النصوص، 
            الصور، الرسومات، الشعارات، الأيقونات، الصوت، الفيديو، والبرمجيات، هي ملكية للدكتور 
            خالد الدعجة أو مرخصة له، وهي محمية بموجب قوانين حقوق النشر والملكية الفكرية الدولية.
          </p>
          <p className="text-gray-700 leading-relaxed">
            لا يجوز لك استخدام أي من محتويات المنصة لأغراض تجارية دون الحصول على موافقة كتابية 
            صريحة منا. العلامات التجارية والشعارات المعروضة على المنصة هي علامات مسجلة، وأي استخدام 
            غير مصرح به لها يعتبر انتهاكاً لحقوق الملكية الفكرية.
          </p>
        </motion.div>

        {/* Section 5 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            السلوك المقبول
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            يجب عليك استخدام المنصة بطريقة قانونية ومحترمة. يُحظر عليك القيام بأي من الأنشطة التالية: 
            محاولة الوصول غير المصرح به إلى أنظمة المنصة، نشر محتوى مسيء أو غير لائق، التحايل على 
            إجراءات الأمان، استخدام المنصة لأي غرض غير قانوني، أو التدخل في تجربة المستخدمين الآخرين.
          </p>
          <p className="text-gray-700 leading-relaxed">
            نحتفظ بالحق في تعليق أو إنهاء حسابك فوراً دون إشعار مسبق إذا انتهكت أياً من هذه الشروط 
            أو إذا اعتبرنا أن سلوكك غير مقبول أو ضار بالمنصة أو المستخدمين الآخرين. قد نتخذ أيضاً 
            إجراءات قانونية إذا لزم الأمر.
          </p>
        </motion.div>

        {/* Section 6 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ادفع والاشتراكات
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            قد تتطلب بعض الخدمات أو المحتوى على المنصة دفع رسوم اشتراك. ستكون جميع الرسوم واضحة 
            ومحددة قبل إتمام أي عملية شراء. المدفوعات غير قابلة للاسترداد ما لم ينص القانون على 
            خلاف ذلك أو ما لم نقرر خلاف ذلك وفقاً لتقديرنا الخاص.
          </p>
          <p className="text-gray-700 leading-relaxed">
            أنت مسؤول عن دفع جميع الرسوم المطبقة في الوقت المحدد. إذا فشلت في الدفع، قد نقوم بتعليق 
            أو إلغاء الوصول إلى الخدمات المدفوعة. نحتفظ بالحق في تغيير الأسعار في أي وقت، ولكن 
            سيتم إشعارك بأي تغييرات قبل تطبيقها على اشتراكك الحالي.
          </p>
        </motion.div>

        {/* Section 7 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            إخلاء المسؤولية
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            المنصة والمحتوى التعليمي متوفران "كما هي" دون أي ضمانات من أي نوع، سواء كانت صريحة أو 
            ضمنية. نحن لا نضمن أن المنصة ستكون متاحة دائماً أو خالية من الأخطاء، أو أن المحتوى 
            سيكون دقيقاً أو كاملاً أو محدثاً في جميع الأوقات.
          </p>
          <p className="text-gray-700 leading-relaxed">
            نحن نبذل قصارى جهدنا لتوفير محتوى تعليمي عالي الجودة، لكننا لا نضمن تحقيق نتائج أكاديمية 
            محددة من استخدام المنصة. نجاحك الأكاديمي يعتمد على عوامل متعددة، بما في ذلك جهدك 
            الشخصي والتزامك بالدراسة. استخدامك للمنصة هو على مسؤوليتك الخاصة.
          </p>
        </motion.div>

        {/* Section 8 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            حدود المسؤولية
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            لن نكون مسؤولين عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو خاصة أو تبعية ناتجة عن 
            استخدامك أو عدم قدرتك على استخدام المنصة، بما في ذلك على سبيل المثال لا الحصر: فقدان 
            البيانات، فقدان الأرباح، أو توقف الأعمال، حتى لو تم إخطارنا بإمكانية حدوث مثل هذه الأضرار.
          </p>
          <p className="text-gray-700 leading-relaxed">
            في جميع الأحوال، لن تتجاوز مسؤوليتنا الإجمالية تجاهك المبلغ الذي دفعته لنا خلال الستة 
            أشهر السابقة للمطالبة. بعض الدول لا تسمح بحدود معينة على المسؤولية، لذلك قد لا تنطبق 
            هذه الحدود عليك.
          </p>
        </motion.div>

        {/* Section 9 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            القانون الحاكم وحل النزاعات
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            تخضع هذه الشروط والأحكام وتُفسر وفقاً لقوانين المملكة الأردنية الهاشمية. أي نزاع ينشأ 
            عن أو يتعلق بهذه الشروط أو استخدامك للمنصة سيتم حله أولاً من خلال المفاوضات الودية 
            بين الطرفين.
          </p>
          <p className="text-gray-700 leading-relaxed">
            إذا لم يتم حل النزاع ودياً خلال 30 يوماً، يوافق الطرفان على إحالة النزاع إلى المحاكم 
            المختصة في الأردن. باستخدامك للمنصة، فإنك توافق على الاختصاص القضائي الحصري لهذه المحاكم.
          </p>
        </motion.div>

        {/* Section 10 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            التواصل معنا
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            إذا كان لديك أي أسئلة أو استفسارات حول ذه الشروط والأحكام، أو إذا كنت بحاجة إلى 
            توضيح حول أي بند، فنحن نشجعك على التواصل معنا. نحن ملتزمون بتوفير بيئة تعليمية 
            شفافة وعادلة لجميع الطلاب.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            يمكنك التواصل معنا عبر الهاتف على الرقم: <strong className="text-emerald-600">0791234567</strong>، 
            أو عبر البريد الإلكتروني: <strong className="text-emerald-600">info@khaled-dajah.com</strong>. 
            فريقنا مستعد لمساعدتك والإجابة على جميع أسئلتك في أي وقت.
          </p>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-center pt-8 border-t border-gray-200"
        >
          <p className="text-gray-500 text-sm">
            آخر تحديث: فبراير 2026
          </p>
        </motion.div>
      </div>
    </div>
  );
}