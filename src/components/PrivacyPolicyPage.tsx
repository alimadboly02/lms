import { motion, useMotionValue, useTransform } from 'motion/react';
import { Home as HomeIcon, ChevronLeft } from 'lucide-react';
import logoImage from "figma:asset/9fb5bb008cfa075620dedaf2d6ee1171c8069760.png";
import { PageHeader } from './PageHeader';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export function PrivacyPolicyPage({ onBack }: PrivacyPolicyPageProps) {
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
        title="سياسة الخصوصية"
        breadcrumb="سياسة الخصوصية"
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
            تعريف سياسة الخصوصية
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            نحن في منصة الدكتور خالد الدعجة نلتزم بحماية خصوصيتك وأمان معلوماتك الشخصية. 
            هذه السياسة توضح كيفية جمعنا واستخدامنا وحمايتنا للبيانات التي تقدمها لنا عند استخدام خدماتنا التعليمية.
          </p>
          <p className="text-gray-700 leading-relaxed">
            باستخدامك لهذه المنصة، فإنك توافق على جمع واستخدام المعلومات وفقاً لهذه السياسة. 
            نحن نحترم حقوقك ونضمن أن بياناتك ستُستخدم فقط للأغراض التعليمية المحددة في هذه الوثيقة.
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            المعلومات العامة
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            نقوم بجمع المعلومات التالية عند التسجيل في المنصة: الاسم الكامل، رقم الهاتف، المدينة، 
            والجيل الدراسي (2008 أو 2009). هذه المعلومات ضرورية لتوفير الخدمات التعليمية المناسبة لك 
            ولإنشاء حسابك الشخصي على المنصة.
          </p>
          <p className="text-gray-700 leading-relaxed">
            نحن نستخدم هذه المعلومات لتخصيص المحتوى التعليمي بناءً على جيلك الدراسي، ولتتبع تقدمك 
            الأكاديمي ونقاطك، ولإرسال الإشعارات والتحديثات المهمة المتعلقة بدراستك. كما نستخدمها 
            لتحسين جودة الخدمات المقدمة وللتواصل معك عند الحاجة.
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
            توفر الموقع
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            نسعى جاهدين لضمان توفر المنصة على مدار الساعة، ولكن قد تحدث أحياناً فترات صيانة أو 
            تحديثات ضرورية لتحسين الخدمة. سنبذل قصارى جهدنا لإشعارك مسبقاً بأي توقف مخطط للخدمة.
          </p>
          <p className="text-gray-700 leading-relaxed">
            في حالة حدوث أي مشاكل تقنية، يرجى التواصل معنا عبر قنوات الدعم المتاحة، وسنعمل على 
            حل المشكلة في أسرع وقت ممكن. نحن نقدر صبرك وتفهمك ونلتزم بتوفير تجربة تعليمية سلسة 
            ومستمرة لجميع الطلاب.
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
            حماية البيانات والأمان
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            نتخذ إجراءات أمنية صارمة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل 
            أو الإفصاح أو التدمير. يتم تشفير جميع كلمات المرور باستخدام تقنيات تشفير حديثة ومعتمدة، 
            ولا يمكن لأي شخص، بما في ذلك موظفينا، الوصول إلى كلمة مرورك الفعلية.
          </p>
          <p className="text-gray-700 leading-relaxed">
            نحن لا نشارك معلوماتك الشخصية مع أي أطراف ثالثة لأغراض تسويقية أو تجارية دون إذنك 
            الصريح. الوصول إلى بياناتك محصور فقط على الموظفين المخولين الذين يحتاجون إليها لتوفير 
            الخدمات التعليمية. نقوم بمراقبة أنظمتنا الأمنية بشكل مستمر ونحدثها بانتظام لضمان أعلى 
            مستويات الحماية.
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
            حقوق المستخدم
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            كمستخدم لمنصتنا، لديك عدة حقوق مهمة فيما يتعلق ببياناتك الشخصية. يمكنك الوصول إلى 
            معلوماتك الشخصية في أي وقت من خلال صفحة الملف الشخصي، حيث يمكنك مراجعة جميع البيانات 
            المخزنة عنك. لديك أيضاً الحق في تعديل أو تحديث أي معلومات غير دقيقة أو قديمة.
          </p>
          <p className="text-gray-700 leading-relaxed">
            إذا رغبت في حذف حسابك بشكل نهائي، يمكنك القيام بذلك من خلال التواصل مع فريق الدعم. 
            عند حذف حسابك، سيتم حذف جميع بياناتك الشخصية بشكل دائم من أنظمتنا. يمكنك أيضاً طلب 
            نسخة من بياناتك المخزنة أو الاعتراض على معالجة معلومات معينة.
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
            ملفات تعريف الارتباط (Cookies)
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربتك على المنصة وجعلها أكثر سهولة 
            وفعالية. هذه الملفات عبارة عن ملفات نصية صغيرة يتم تخزينها على جهازك عند زيارتك للموقع. 
            نستخدمها للحفاظ على تسجيل دخولك، حتى لا تضطر لإدخال معلوماتك في كل مرة تزور فيها المنصة.
          </p>
          <p className="text-gray-700 leading-relaxed">
            كما نستخدم ملفات تعريف الارتباط لتذكر تفضيلاتك وإعداداتك، ولتحليل كيفية استخدام 
            المنصة بهدف تحسين الأداء والمحتوى. يمكنك التحكم في ملفات تعريف الارتباط من خلال 
            إعدادات متصفحك، لكن يرجى ملاحظة أن تعطيلها قد يؤثر على بعض وظائف المنصة.
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
            التحديثات على سياسة الخصوصية
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر لتعكس التغييرات في ممارساتنا أو للامتثال 
            للقوانين واللوائح الجديدة. عندما نقوم بإجراء تغييرات جوهرية على هذه السياسة، سنقوم 
            بإشعارك من خلال إشعار بارز على المنصة أو عبر البريد الإلكتروني أو رسالة نصية.
          </p>
          <p className="text-gray-700 leading-relaxed">
            يُنصح بمراجعة هذه الصفحة بشكل دوري للبقاء على اطلاع بأحدث المعلومات حول كيفية حمايتنا 
            لبياناتك. استمرارك في استخدام المنصة بعد نشر التحديثات يعني موافقتك على السياسة المحدثة.
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
            التواصل معنا
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            إذا كان لديك أي أسئلة أو استفسارات حول سياسة الخصوصية هذه، أو كيفية استخدامنا 
            لمعلوماتك، أو حقوقك فيما يتعلق ببياناتك الشخصية، فلا تتردد في التواصل معنا. 
            نحن نرحب بجميع الاستفسارات ونلتزم بالرد عليها في أقرب وقت ممكن.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            يمكنك التواصل معنا عبر الهاتف على الرقم: <strong className="text-emerald-600">0791234567</strong>، 
            أو عبر البريد الإلكتروني: <strong className="text-emerald-600">info@khaled-dajah.com</strong>. 
            فريقنا متاح للإجابة على جميع أسئلتك ومساعدتك في أي مسألة تتعلق بخصوصيتك وأمان بياناتك.
          </p>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
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