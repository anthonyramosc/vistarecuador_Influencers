// types/Influencer.ts
export interface SocialLink {
    platform: 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'facebook';
    url: string;
}

export interface InfluencerVideo {
    id: string;
    title: string;
    thumbnailUrl: string;
    videoUrl: string;
}

export interface Influencer {
    id: number;
    name: string;
    role: string;
    imageUrl: string;
    bio?: string;
    socialLinks?: SocialLink[];
    videos?: InfluencerVideo[];
}
