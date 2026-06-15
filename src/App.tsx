import { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ChatProvider } from "./components/support/ChatContext";
import { FloatingSupport } from "./components/support/FloatingSupport";
import { Home } from "./pages/Home";
import { SubcategoryDetailPage } from "./pages/SubcategoryDetailPage";
import { ProfilePage } from "./components/ProfilePage";
import { ChangePasswordPage } from "./components/ChangePasswordPage";
import { AuthPage } from "./components/AuthPage";
import { LoginRequiredDialog } from "./components/LoginRequiredDialog";
import { TopAppBar } from "./components/TopAppBar";
import { Footer } from "./components/Footer";
import { ForgotPasswordPage } from "./components/ForgotPasswordPage";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";
import { TermsAndConditionsPage } from "./components/TermsAndConditionsPage";
import { AddReviewPage } from "./components/AddReviewPage";
import { SubCategory } from "./types";


type PageType = "home" | "subcategory" | "profile" | "changePassword" | "auth" | "forgotPassword" | "privacyPolicy" | "terms" | "addReview";

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [selectedSubcategory, setSelectedSubcategory] = useState<SubCategory | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [triggerSupportOpen, setTriggerSupportOpen] = useState(false);

  const handleSubcategoryClick = (subcategory: SubCategory) => {
    // إذا لم يكن المستخدم مسجلاً، أظهر dialog
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }

    // إذا كان مسجلاً، افتح الصفحة
    setSelectedSubcategory(subcategory);
    setCurrentPage("subcategory");
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
    setSelectedSubcategory(null);
    window.scrollTo(0, 0);
  };

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      handleGoToLogin();
      return;
    }
    setCurrentPage("profile");
    window.scrollTo(0, 0);
  };

  const handleChangePasswordClick = () => {
    if (!isAuthenticated) {
      handleGoToLogin();
      return;
    }
    setCurrentPage("changePassword");
    window.scrollTo(0, 0);
  };

  const handleBackFromChangePassword = () => {
    setCurrentPage("home");
    window.scrollTo(0, 0);
  };

  const handleLoginSuccess = () => {
    setCurrentPage("home");
    window.scrollTo(0, 0);
  };

  const handleGoToLogin = () => {
    setShowLoginDialog(false);
    setAuthMode('login');
    setCurrentPage("auth");
    window.scrollTo(0, 0);
  };

  const handleGoToSignup = () => {
    setShowLoginDialog(false);
    setAuthMode('signup');
    setCurrentPage("auth");
    window.scrollTo(0, 0);
  };

  const handleForgotPassword = () => {
    setCurrentPage("forgotPassword");
    window.scrollTo(0, 0);
  };

  const handleBackToLogin = () => {
    setAuthMode('login');
    setCurrentPage("auth");
    window.scrollTo(0, 0);
  };

  const handlePrivacyPolicyClick = () => {
    setCurrentPage("privacyPolicy");
    window.scrollTo(0, 0);
  };

  const handleTermsAndConditionsClick = () => {
    setCurrentPage("terms");
    window.scrollTo(0, 0);
  };

  const handleAddReviewClick = () => {
    if (!isAuthenticated) {
      handleGoToLogin();
      return;
    }
    setCurrentPage("addReview");
    window.scrollTo(0, 0);
  };

  const handleSupportClick = () => {
    setTriggerSupportOpen(true);
  };

  return (
    <>
      {/* Top App Bar - يظهر فوق جميع الصفحات */}
      <TopAppBar
        onProfileClick={handleProfileClick}
        onChangePasswordClick={handleChangePasswordClick}
        onLoginClick={handleGoToLogin}
        onHomeClick={handleBackToHome}
        onAddReviewClick={handleAddReviewClick}
        onSupportClick={handleSupportClick}
        onCategoryClick={(categoryId) => {
          // التمرير للأسفل إلى قسم الفئات وفتحه تلقائياً
          handleBackToHome();
          setExpandedCategory(categoryId);
          setTimeout(() => {
            const categoriesSection = document.getElementById(`category-${categoryId}`);
            if (categoriesSection) {
              categoriesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }}
      />

      {/* Main Content - with padding to account for fixed AppBar */}
      <div className="pt-16 min-h-screen">
        {/* Login Required Dialog */}
        <LoginRequiredDialog
          isOpen={showLoginDialog}
          onClose={() => setShowLoginDialog(false)}
          onLogin={handleGoToLogin}
          onSignup={handleGoToSignup}
        />

        {/* Auth Page */}
        {currentPage === "auth" && (
          <AuthPage 
            onLoginSuccess={handleLoginSuccess}
            initialMode={authMode}
            onBack={handleBackToHome}
            onForgotPassword={handleForgotPassword}
          />
        )}

        {/* Forgot Password Page */}
        {currentPage === "forgotPassword" && (
          <ForgotPasswordPage 
            onBack={handleBackToLogin}
          />
        )}

        {/* Profile Page */}
        {currentPage === "profile" && (
          <ProfilePage 
            onBack={handleBackToHome} 
            onProfileClick={handleProfileClick} 
            onChangePasswordClick={handleChangePasswordClick} 
          />
        )}

        {/* Change Password Page */}
        {currentPage === "changePassword" && (
          <ChangePasswordPage onBack={handleBackFromChangePassword} />
        )}

        {/* Subcategory Detail Page */}
        {currentPage === "subcategory" && selectedSubcategory && (
          <SubcategoryDetailPage
            subcategory={selectedSubcategory}
            onBack={handleBackToHome}
            onProfileClick={handleProfileClick}
            onChangePasswordClick={handleChangePasswordClick}
          />
        )}

        {/* Home Page */}
        {currentPage === "home" && (
          <Home 
            onSubcategoryClick={handleSubcategoryClick}
            onProfileClick={handleProfileClick}
            onChangePasswordClick={handleChangePasswordClick}
            onAddReviewClick={handleAddReviewClick}
            expandedCategory={expandedCategory}
          />
        )}

        {/* Privacy Policy Page */}
        {currentPage === "privacyPolicy" && (
          <PrivacyPolicyPage 
            onBack={handleBackToHome}
          />
        )}

        {/* Terms and Conditions Page */}
        {currentPage === "terms" && (
          <TermsAndConditionsPage 
            onBack={handleBackToHome}
          />
        )}

        {/* Add Review Page */}
        {currentPage === "addReview" && (
          <AddReviewPage 
            onBack={handleBackToHome}
          />
        )}
      </div>

      {/* Footer - يظهر أسفل جميع الصفحات */}
      <Footer 
        onPrivacyPolicyClick={handlePrivacyPolicyClick}
        onTermsClick={handleTermsAndConditionsClick}
        onHomeClick={handleBackToHome}
        onCategoryClick={(categoryId) => {
          // التمرير للأسفل إلى قسم الفئات وفتحه تلقائياً
          handleBackToHome();
          setExpandedCategory(categoryId);
          setTimeout(() => {
            const categoriesSection = document.getElementById(`category-${categoryId}`);
            if (categoriesSection) {
              categoriesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }}
        onAddReviewClick={handleAddReviewClick}
        onSupportClick={handleSupportClick}
      />
      
      {/* Floating Support */}
      <FloatingSupport 
        triggerOpen={triggerSupportOpen}
        onTriggerHandled={() => setTriggerSupportOpen(false)}
      />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <AppContent />
      </ChatProvider>
    </AuthProvider>
  );
}