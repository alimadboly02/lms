/// <reference path="../react.d.ts" />
import { Header } from "../components/Header";
import { Categories } from "../components/Categories";
import { BreakingNews } from "../components/BreakingNews";
import { FAQs } from "../components/FAQs";
import { AboutUs } from "../components/AboutUs";
import { Leaderboard } from "../components/Leaderboard";
import { AnimatedSection } from "../components/AnimatedSection";
import { ReviewsSection } from "../components/ReviewsSection";
import { SubCategory } from "../types";


interface HomeProps {
  onSubcategoryClick: (subcategory: SubCategory) => void;
  onProfileClick?: () => void;
  onChangePasswordClick?: () => void;
  onAddReviewClick?: () => void;
  expandedCategory?: string | null;
}

export function Home({ onSubcategoryClick, onAddReviewClick, expandedCategory }: HomeProps) {
  
  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "Tajawal, sans-serif" }}
      dir="rtl"
    >
      {/* Hero Header */}
      <Header />

      {/* Breaking News Ticker */}
      <BreakingNews />

      {/* Categories Section */}
      <AnimatedSection>
        <Categories onSubcategoryClick={onSubcategoryClick} expandedCategory={expandedCategory} />
      </AnimatedSection>

      {/* FAQs Section */}
      <AnimatedSection delay={0.1}>
        <FAQs />
      </AnimatedSection>

      {/* About Us Section */}
      <AnimatedSection delay={0.2}>
        <AboutUs />
      </AnimatedSection>

      {/* Leaderboard Section */}
      <AnimatedSection delay={0.3}>
        <Leaderboard />
      </AnimatedSection>

      {/* Reviews Section */}
      <AnimatedSection delay={0.4}>
        <ReviewsSection onAddReviewClick={onAddReviewClick} />
      </AnimatedSection>
    </div>
  );
}