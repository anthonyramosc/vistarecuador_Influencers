// interfaces.ts
export interface RealityCard {
    id: number;
    title: string;
    description: string;
    image: string;
    likes: number;
    createdAt?: string;
    category?: string;
    location?: string;
    progress?: number;
    goal?: number;
    supporters?: number;
}

export interface RealitySectionProps {
    realityCards: RealityCard[];
}

export interface LikedItemsState {
    [key: number]: boolean;
}

 export interface LinkCard {
     title: string;
     image: string;
     url: string;
 }

 export interface LinksSectionProps {
     linkCards: LinkCard[];
 }

 export interface ProjectCard {
     title: string;
     description: string;
     image: string;
     author?: string;
     rating?: number;
     date?: string;
     link?: string;
     tags?: string[];
 }

 export interface ProjectsSectionProps {
     projectCards: ProjectCard[];
 }

 export interface PromotionItem {
     title: string;
     description: string;
     imageUrl: string;
 }

 export interface PromosBenefitsProps {
     promotions: PromotionItem[];
     benefits: PromotionItem[];
 }
 export interface DownloadItem {
     title: string;
     imageUrl: string;
     isAvailable: boolean;
     link?: string;
 }

 export interface DownloadsSectionProps {
     downloadItems: DownloadItem[];
 }
