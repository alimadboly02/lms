import { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronDown,
  ChevronRight,
  Video,
  Lock,
  Menu,
  X,
  ArrowRight,
  FileText,
  Download,
  ExternalLink,
  ClipboardList,
  Music
} from "lucide-react";
import { Footer } from "./Footer";
import { ExamComponent } from "./ExamComponent";
import { AudioPlayer } from "./AudioPlayer";
import { getSubcategoryContent, type Lesson, type Section } from "../data/courseContent";

interface SubcategoryDetailProps {
  subcategory: {
    id: number;
    title: string;
    icon: string;
  };
  onBack: () => void;
  onProfileClick?: () => void;
  onChangePasswordClick?: () => void;
}

export function SubcategoryDetail({ subcategory, onBack, onProfileClick, onChangePasswordClick }: SubcategoryDetailProps) {
  // الحصول على المحتوى الخاص بالـ subcategory
  const contentData = getSubcategoryContent(subcategory.id);
  const courseSections = contentData?.sections || [];

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(() => {
    if (!courseSections || courseSections.length === 0) return null;
    
    // 1. Try to find first lesson in first section
    const firstSection = courseSections[0];
    if (firstSection.lessons && firstSection.lessons.length > 0) {
      return firstSection.lessons[0];
    }
    
    // 2. If no direct lessons, try first subsection's first lesson
    if (firstSection.subsections && firstSection.subsections.length > 0) {
      const firstSubsection = firstSection.subsections[0];
      if (firstSubsection.lessons && firstSubsection.lessons.length > 0) {
        return firstSubsection.lessons[0];
      }
    }
    
    return null;
  });

  const [expandedSections, setExpandedSections] = useState<number[]>(() => {
    return (courseSections && courseSections.length > 0) ? [courseSections[0].id] : [];
  });
  
  const [expandedSubsections, setExpandedSubsections] = useState<number[]>(() => {
    if (!courseSections || courseSections.length === 0) return [];
    
    const firstSection = courseSections[0];
    if (firstSection.subsections && firstSection.subsections.length > 0) {
      return [firstSection.subsections[0].id];
    }
    return [];
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Reset state when subcategory changes
  useEffect(() => {
    if (courseSections.length > 0) {
      const firstSection = courseSections[0];
      setExpandedSections([firstSection.id]);
      
      // Try to select first lesson directly
      if (firstSection.lessons && firstSection.lessons.length > 0) {
        setSelectedLesson(firstSection.lessons[0]);
        setExpandedSubsections([]);
      } 
      // If no direct lessons, try first subsection
      else if (firstSection.subsections && firstSection.subsections.length > 0) {
        const firstSubsection = firstSection.subsections[0];
        setExpandedSubsections([firstSubsection.id]);
        
        if (firstSubsection.lessons && firstSubsection.lessons.length > 0) {
          setSelectedLesson(firstSubsection.lessons[0]);
        } else {
          setSelectedLesson(null);
        }
      } else {
        setSelectedLesson(null);
        setExpandedSubsections([]);
      }
    } else {
      setExpandedSections([]);
      setExpandedSubsections([]);
      setSelectedLesson(null);
    }
  }, [subcategory.id]);

  const toggleSection = (sectionId: number) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const toggleSubsection = (subsectionId: number) => {
    setExpandedSubsections(prev =>
      prev.includes(subsectionId)
        ? prev.filter(id => id !== subsectionId)
        : [...prev, subsectionId]
    );
  };

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsSidebarOpen(false);
  };

  // دالة لإرجاع الأيقونة المناسبة حسب نوع الدرس
  const getLessonIcon = (lesson: Lesson) => {
    switch (lesson.type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />;
      case 'video':
        return <Video className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />;
      case 'audio':
        return <Music className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />;
      case 'exam':
        return <ClipboardList className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />;
      case 'thumbnail-link':
        return <ExternalLink className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />;
      default:
        return <Video className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden fixed top-20 left-4 z-50 w-12 h-12 bg-emerald-500 text-white rounded-[5px] shadow-lg flex items-center justify-center hover:bg-emerald-600 transition-all"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Sidebar - Lessons List - RIGHT in RTL */}
          <motion.aside
            initial={false}
            className={`
              fixed lg:static top-0 right-0 h-screen lg:h-screen
              w-80 lg:w-96 bg-white shadow-lg lg:shadow-none
              z-40 lg:z-auto overflow-y-auto
              transition-transform duration-300
              ${isSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
            `}
          >
            {/* Course Sections */}
            <nav className="p-4 pt-20 lg:pt-4">
              {courseSections.map((section) => (
                <div key={section.id} className="mb-4">
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={`
                      w-full flex items-center justify-between text-right px-5 py-4 rounded-[5px]
                      transition-all font-bold relative overflow-hidden
                      ${
                        expandedSections.includes(section.id)
                          ? "bg-emerald-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }
                    `}
                  >
                    {expandedSections.includes(section.id) && (
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-2 -right-2 w-10 h-10 border border-white/20 rounded-full"></div>
                        <div className="absolute -bottom-1 -left-1 w-8 h-8 border border-white/15 rounded-full"></div>
                      </div>
                    )}
                    <span className="relative z-10 text-base">{section.title}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform relative z-10 ${
                        expandedSections.includes(section.id) ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Lessons List */}
                  <AnimatePresence>
                    {expandedSections.includes(section.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 space-y-3 bg-gray-50 rounded-[5px] p-3">
                          {section.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className={`
                                p-4 rounded-[5px] bg-white border transition-all
                                ${
                                  selectedLesson?.id === lesson.id
                                    ? "border-emerald-300 shadow-sm"
                                    : "border-gray-200"
                                }
                                ${lesson.isLocked ? "opacity-60" : "cursor-pointer hover:border-emerald-200"}
                              `}
                              onClick={() => handleLessonClick(lesson)}
                            >
                              {/* Lesson Title */}
                              <div className="flex items-start gap-3 mb-3">
                                {getLessonIcon(lesson)}
                                <h3 className="text-sm font-semibold text-gray-800 flex-1">
                                  {lesson.title}
                                </h3>
                              </div>

                              {/* Lesson Actions */}
                              <div className="flex items-center justify-between">
                                <button
                                  onClick={(e: MouseEvent) => {
                                    e.stopPropagation();
                                    if (!lesson.isLocked) {
                                      handleLessonClick(lesson);
                                    }
                                  }}
                                  disabled={lesson.isLocked}
                                  className={`
                                    text-sm font-semibold flex items-center gap-1.5 transition-colors
                                    ${
                                      lesson.isLocked
                                        ? "text-gray-400 cursor-not-allowed"
                                        : "text-emerald-600 hover:text-emerald-700"
                                    }
                                  `}
                                >
                                  <span>عرض الدرس</span>
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-gray-600">{lesson.duration}</span>
                                  {lesson.isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* Subsections */}
                          {section.subsections?.map((subsection) => (
                            <div key={subsection.id} className="mt-4">
                              {/* Subsection Header */}
                              <button
                                onClick={() => toggleSubsection(subsection.id)}
                                className={`
                                  w-full flex items-center justify-between text-right px-5 py-4 rounded-[5px]
                                  transition-all font-bold relative overflow-hidden
                                  ${
                                    expandedSubsections.includes(subsection.id)
                                      ? "bg-emerald-500 text-white shadow-md"
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                  }
                                `}
                              >
                                {expandedSubsections.includes(subsection.id) && (
                                  <div className="absolute inset-0 overflow-hidden">
                                    <div className="absolute -top-2 -right-2 w-10 h-10 border border-white/20 rounded-full"></div>
                                    <div className="absolute -bottom-1 -left-1 w-8 h-8 border border-white/15 rounded-full"></div>
                                  </div>
                                )}
                                <span className="relative z-10 text-base">{subsection.title}</span>
                                <ChevronDown
                                  className={`w-5 h-5 transition-transform relative z-10 ${
                                    expandedSubsections.includes(subsection.id) ? "rotate-180" : ""
                                  }`}
                                />
                              </button>

                              {/* Subsection Lessons List */}
                              <AnimatePresence>
                                {expandedSubsections.includes(subsection.id) && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mt-2 space-y-3 bg-gray-50 rounded-[5px] p-3">
                                      {subsection.lessons.map((lesson) => (
                                        <div
                                          key={lesson.id}
                                          className={`
                                            p-4 rounded-[5px] bg-white border transition-all
                                            ${
                                              selectedLesson?.id === lesson.id
                                                ? "border-emerald-300 shadow-sm"
                                                : "border-gray-200"
                                            }
                                            ${lesson.isLocked ? "opacity-60" : "cursor-pointer hover:border-emerald-200"}
                                          `}
                                          onClick={() => handleLessonClick(lesson)}
                                        >
                                          {/* Lesson Title */}
                                          <div className="flex items-start gap-3 mb-3">
                                            {getLessonIcon(lesson)}
                                            <h3 className="text-sm font-semibold text-gray-800 flex-1">
                                              {lesson.title}
                                            </h3>
                                          </div>

                                          {/* Lesson Actions */}
                                          <div className="flex items-center justify-between">
                                            <button
                                              onClick={(e: MouseEvent) => {
                                                e.stopPropagation();
                                                if (!lesson.isLocked) {
                                                  handleLessonClick(lesson);
                                                }
                                              }}
                                              disabled={lesson.isLocked}
                                              className={`
                                                text-sm font-semibold flex items-center gap-1.5 transition-colors
                                                ${
                                                  lesson.isLocked
                                                    ? "text-gray-400 cursor-not-allowed"
                                                    : "text-emerald-600 hover:text-emerald-700"
                                                }
                                              `}
                                            >
                                              <span>عرض الدرس</span>
                                              <ArrowRight className="w-4 h-4" />
                                            </button>
                                            <div className="flex items-center gap-2">
                                              <span className="text-sm text-gray-600">{lesson.duration}</span>
                                              {lesson.isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </motion.aside>

          {/* Video Player Area - LEFT in RTL */}
          <main className="flex-1 bg-gray-50 p-4 lg:p-8">
            {/* Back Button */}
            <div className="mb-6">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
                <span className="font-semibold">العودة للرئيسية</span>
              </button>
            </div>

            {/* Breadcrumb */}
            <div className="mb-4 text-sm text-gray-600">
              <span>الرئيسية</span>
              <span className="mx-2">/</span>
              <span>{subcategory.title}</span>
              <span className="mx-2">/</span>
              <span className="text-emerald-600">{selectedLesson?.title}</span>
            </div>

            {/* Content Container */}
            <div className="max-w-5xl">
              <motion.div
                key={selectedLesson?.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[5px] shadow-lg overflow-hidden"
              >
                {/* Content Area */}
                {selectedLesson?.type === 'exam' && selectedLesson.examData && (
                  <ExamComponent 
                    examData={selectedLesson.examData}
                    examTitle={selectedLesson.title}
                  />
                )}

                {selectedLesson?.type === 'video' && selectedLesson.videoUrl && (
                  <>
                    {/* Video Player */}
                    <div className="aspect-video bg-black relative">
                      <iframe
                        width="100%"
                        height="100%"
                        src={selectedLesson.videoUrl}
                        title={selectedLesson.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </div>

                    {/* Video Info */}
                    <div className="p-6 border-t border-gray-200">
                      <h1 className="text-2xl font-bold text-gray-800 mb-3">
                        {selectedLesson.title}
                      </h1>
                      <div className="flex items-center gap-6 text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4 text-emerald-500" />
                          <span>فيديو تعليمي</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{selectedLesson.duration}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* PDF Viewer */}
                {selectedLesson?.type === 'pdf' && selectedLesson.pdfUrl && (
                  <>
                    <div className="aspect-video bg-gray-100 relative">
                      <iframe
                        src={selectedLesson.pdfUrl}
                        title={selectedLesson.title}
                        className="w-full h-full"
                      ></iframe>
                    </div>

                    {/* PDF Info */}
                    <div className="p-6 border-t border-gray-200">
                      <h1 className="text-2xl font-bold text-gray-800 mb-3">
                        {selectedLesson.title}
                      </h1>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <FileText className="w-4 h-4 text-emerald-500" />
                          <span>ملف PDF</span>
                        </div>
                        <a
                          href={selectedLesson.pdfUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-[5px] hover:bg-emerald-600 transition-all text-sm font-semibold relative overflow-hidden"
                        >
                          <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute -top-1 -right-1 w-6 h-6 border border-white/20 rounded-full"></div>
                            <div className="absolute bottom-0 left-2 w-4 h-4 border border-white/15 rounded-full"></div>
                          </div>
                          <Download className="w-4 h-4 relative z-10" />
                          <span className="relative z-10">تحميل الملف</span>
                        </a>
                      </div>
                    </div>
                  </>
                )}

                {/* Thumbnail with External Link */}
                {selectedLesson?.type === 'thumbnail-link' && selectedLesson.externalLink && selectedLesson.thumbnailUrl && (
                  <>
                    <div 
                      className="aspect-video bg-black relative cursor-pointer group"
                      onClick={() => window.open(selectedLesson.externalLink, '_blank')}
                    >
                      <img
                        src={selectedLesson.thumbnailUrl}
                        alt={selectedLesson.title}
                        className="w-full h-full object-cover"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-20 h-20 mx-auto mb-4 bg-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ExternalLink className="w-10 h-10" />
                          </div>
                          <p className="text-lg font-bold">اضغط لمشاهدة الفيديو على YouTube</p>
                        </div>
                      </div>
                    </div>

                    {/* Thumbnail Info */}
                    <div className="p-6 border-t border-gray-200">
                      <h1 className="text-2xl font-bold text-gray-800 mb-3">
                        {selectedLesson.title}
                      </h1>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Video className="w-4 h-4 text-emerald-500" />
                          <span>فيديو يوتيوب خارجي</span>
                        </div>
                        <a
                          href={selectedLesson.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-[5px] hover:bg-emerald-600 transition-all text-sm font-semibold relative overflow-hidden"
                        >
                          <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute -top-1 -right-1 w-6 h-6 border border-white/20 rounded-full"></div>
                            <div className="absolute bottom-0 left-2 w-4 h-4 border border-white/15 rounded-full"></div>
                          </div>
                          <ExternalLink className="w-4 h-4 relative z-10" />
                          <span className="relative z-10">فتح في YouTube</span>
                        </a>
                      </div>
                    </div>
                  </>
                )}

                {/* Audio Player */}
                {selectedLesson?.type === 'audio' && selectedLesson.audioUrl && (
                  <AudioPlayer
                    audioUrl={selectedLesson.audioUrl}
                    title={selectedLesson.title}
                    thumbnailUrl={selectedLesson.thumbnailUrl}
                  />
                )}

                {/* Locked Content */}
                {selectedLesson?.isLocked && (
                  <div className="aspect-video bg-black relative">
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <Lock className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">هذا الدرس مقفل</p>
                        <p className="text-sm opacity-75 mt-2">يرجى الاشتراك للوصول إلى جميع الدروس</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Overlay for mobile */}
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsSidebarOpen(false)}
                  className="fixed inset-0 bg-black/50 z-30 lg:hidden top-16"
                />
              )}
            </AnimatePresence>
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}