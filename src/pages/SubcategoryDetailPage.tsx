/// <reference path="../react.d.ts" />
import { SubcategoryDetail } from "../components/SubcategoryDetail";
import { SubCategory } from "../types";


interface SubcategoryDetailPageProps {
  subcategory: SubCategory;
  onBack: () => void;
  onProfileClick?: () => void;
  onChangePasswordClick?: () => void;
}

export function SubcategoryDetailPage({ 
  subcategory, 
  onBack, 
  onProfileClick, 
  onChangePasswordClick 
}: SubcategoryDetailPageProps) {
  return (
    
    <SubcategoryDetail 
      subcategory={subcategory} 
      onBack={onBack}
      onProfileClick={onProfileClick}
      onChangePasswordClick={onChangePasswordClick}
    />
  );
}