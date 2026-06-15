import { motion, useMotionValue, useTransform } from 'motion/react';
import { 
  User as UserIcon, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Calendar,
  Trophy,
  Award,
  Star,
  Save,
  X,
  Zap,
  Flame
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import React, { useState, useEffect } from 'react';
import { PageHeader } from './PageHeader';

interface ProfilePageProps {
  onBack: () => void;
  onProfileClick?: () => void;
  onChangePasswordClick?: () => void;
}

export function ProfilePage({ onBack }: ProfilePageProps) {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedCity, setEditedCity] = useState('');
  const [editedGeneration, setEditedGeneration] = useState('');

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
  const x3 = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const y3 = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);

  // Initialize edit values when entering edit mode
  useEffect(() => {
    if (isEditing && user) {
      setEditedName(user.name);
      setEditedCity(user.city);
      setEditedGeneration(user.generation);
    }
  }, [isEditing, user]);

  if (!user) {
    return null;
  }

  // قيم افتراضية في حال كانت غير موجودة
  const points = user.points || 0;
  const rank = user.rank || 0;
  const joinDate = new Date(user.joinDate || Date.now());
  
  const formattedDate = joinDate.toLocaleDateString('ar-JO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // الأيام النشطة - قيمة ثابتة
  const daysSinceJoin = 22;

  // مدن الأردن
  const jordanCities = [
    'عمان', 'الزرقاء', 'إربد', 'العقبة', 'السلط', 'المفرق', 'الرصيفة',
    'الطفيلة', 'معان', 'عجلون', 'جرش', 'مادبا', 'الكرك'
  ];

  const handleSave = () => {
    if (updateUser) {
      updateUser({
        ...user,
        name: editedName,
        city: editedCity,
        generation: editedGeneration
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(user.name);
    setEditedCity(user.city);
    setEditedGeneration(user.generation);
  };

  // استخراج الحرفين الأولين من الاسم
  const getInitials = (name: string) => {
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      // إذا كان هناك كلمتين أو أكثر، خذ الحرف الأول من أول كلمة والحرف الأول من آخر كلمة
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    } else if (words.length === 1 && words[0].length >= 2) {
      // إذا كانت كلمة واحدة فقط، خذ أول حرفين
      return words[0].substring(0, 2).toUpperCase();
    } else if (words.length === 1 && words[0].length === 1) {
      // إذا كان حرف واحد فقط
      return words[0][0].toUpperCase();
    }
    return 'U'; // default
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Page Header with Animations */}
      <PageHeader 
        title="الملف الشخصي"
        breadcrumb="الملف الشخصي"
        onBack={onBack}
        showBreadcrumb={true}
      />

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-16 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Profile Card */}
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[5px] p-8 md:p-10 border border-gray-200"
              >
                {/* Avatar & Name */}
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-3xl">
                      {getInitials(user.name)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">{user.name}</h2>
                    <div className="flex items-center gap-2 text-gray-500">
                      <GraduationCap className="w-5 h-5" />
                      <span className="font-medium">جيل {user.generation}</span>
                    </div>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all text-sm"
                    >
                      تعديل الملف
                    </button>
                  )}
                </div>

                {/* Info Fields */}
                <div className="space-y-3">
                  {/* Name - Edit Mode */}
                  {isEditing && (
                    <div className="relative group">
                      <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-emerald-50/50 to-white rounded-[5px] border border-emerald-100 hover:border-emerald-200 transition-all">
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-white rounded-[5px] shadow-sm">
                          <UserIcon className="w-5 h-5 text-emerald-600" strokeWidth={2} />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-semibold text-emerald-700 mb-2">الاسم الكامل</label>
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedName(e.target.value)}
                            className="w-full px-0 py-1 bg-transparent border-0 border-b-2 border-gray-200 focus:border-emerald-500 focus:outline-none text-gray-900 font-medium text-base transition-colors"
                            placeholder="أدخل اسمك الكامل"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Phone */}
                  <div className="relative group">
                    <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-emerald-50/50 to-white rounded-[5px] border border-emerald-100 hover:border-emerald-200 transition-all">
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-white rounded-[5px] shadow-sm">
                        <Phone className="w-5 h-5 text-emerald-600" strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-emerald-700 mb-1">رقم الهاتف</p>
                        <p className="font-medium text-gray-900 text-base">{user.phone}</p>
                      </div>
                    </div>
                  </div>

                  {/* City */}
                  <div className="relative group">
                    <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-emerald-50/50 to-white rounded-[5px] border border-emerald-100 hover:border-emerald-200 transition-all">
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-white rounded-[5px] shadow-sm">
                        <MapPin className="w-5 h-5 text-emerald-600" strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-emerald-700 mb-1">المدينة</p>
                        {isEditing ? (
                          <select
                            value={editedCity}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEditedCity(e.target.value)}
                            className="w-full px-0 py-1 bg-transparent border-0 border-b-2 border-gray-200 focus:border-emerald-500 focus:outline-none font-medium text-gray-900 text-base transition-colors"
                          >
                            {jordanCities.map((city) => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                        ) : (
                          <p className="font-medium text-gray-900 text-base">{user.city}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Generation */}
                  <div className="relative group">
                    <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-emerald-50/50 to-white rounded-[5px] border border-emerald-100 hover:border-emerald-200 transition-all">
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-white rounded-[5px] shadow-sm">
                        <GraduationCap className="w-5 h-5 text-emerald-600" strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-emerald-700 mb-1">الجيل الدراسي</p>
                        {isEditing ? (
                          <select
                            value={editedGeneration}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEditedGeneration(e.target.value)}
                            className="w-full px-0 py-1 bg-transparent border-0 border-b-2 border-gray-200 focus:border-emerald-500 focus:outline-none font-medium text-gray-900 text-base transition-colors"
                          >
                            <option value="2008">جيل 2008</option>
                            <option value="2009">جيل 2009</option>
                          </select>
                        ) : (
                          <p className="font-medium text-gray-900 text-base">جيل {user.generation}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Join Date */}
                  <div className="relative group">
                    <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-emerald-50/50 to-white rounded-[5px] border border-emerald-100 hover:border-emerald-200 transition-all">
                      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-white rounded-[5px] shadow-sm">
                        <Calendar className="w-5 h-5 text-emerald-600" strokeWidth={2} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-emerald-700 mb-1">تاريخ الانضمام</p>
                        <p className="font-medium text-gray-900 text-base">{formattedDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save/Cancel Buttons in Edit Mode */}
                {isEditing && (
                  <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
                    <button
                      onClick={handleSave}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all"
                    >
                      <Save className="w-5 h-5" />
                      <span>حفظ التغييرات</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-all"
                    >
                      <X className="w-5 h-5" />
                      <span>إلغاء</span>
                    </button>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right Column - Stats */}
            <div className="space-y-4">
              {/* Points Card - Simple & Clean */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-[5px] p-6 border-2 border-emerald-100 hover:border-emerald-200 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                      <Star className="w-5 h-5 text-emerald-600" />
                    </div>
                    <p className="text-sm font-semibold text-gray-600">النقاط الكلية</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <p className="text-4xl font-bold text-gray-900">
                    {points.toLocaleString('ar-JO')}
                  </p>
                  <span className="text-base font-medium text-gray-500">نقطة</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((points / 1000) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                  <p className="text-xs text-gray-500">من 1000 نقطة</p>
                </div>
              </motion.div>

              {/* Rank Card - Simple & Clean */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-[5px] p-6 border-2 border-emerald-100 hover:border-emerald-200 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-amber-600" />
                    </div>
                    <p className="text-sm font-semibold text-gray-600">الترتيب العام</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-xl font-semibold text-gray-500">#</span>
                  <p className="text-4xl font-bold text-gray-900">
                    {rank > 0 ? rank : '-'}
                  </p>
                </div>
                <p className="text-xs text-gray-500">بين جميع الطلاب</p>
                {rank > 0 && rank <= 3 && (
                  <div className="mt-4 p-3 bg-amber-50 rounded-[5px] border border-amber-100">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xl">
                        {rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'}
                      </span>
                      <p className="text-amber-900 font-semibold text-sm">
                        {rank === 1 ? 'المركز الأول!' : rank === 2 ? 'المركز الثاني!' : 'المركز الثالث!'}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Days Active Card - Simple & Clean */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-[5px] p-6 border-2 border-emerald-100 hover:border-emerald-200 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-sm font-semibold text-gray-600">الأيام النشطة</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <p className="text-4xl font-bold text-gray-900">
                    {daysSinceJoin}
                  </p>
                  <span className="text-base font-medium text-gray-500">يوم</span>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-emerald-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-full">
                    <Flame className="w-3 h-3 text-emerald-600" />
                    <span className="text-xs font-semibold text-emerald-700">نشط</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}