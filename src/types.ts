export type PlatformId =
  | 'youtube'
  | 'instagram'
  | 'facebook'
  | 'tiktok'
  | 'twitter'
  | 'reddit'
  | 'pinterest'
  | 'vimeo'
  | 'dailymotion'
  | 'twitch'
  | 'linkedin'
  | 'telegram'
  | 'bilibili'
  | 'soundcloud'
  | 'threads'
  | 'snapchat';

export type CategoryId = 'all' | 'youtube' | 'instagram' | 'facebook' | 'tiktok' | 'audio' | 'other';

export interface MediaFormat {
  id: string;
  quality: string; // e.g. '4K (2160p)', '1080p Full HD', '720p HD', 'MP3 320kbps', 'Thumbnail HD'
  format: 'mp4' | 'mp3' | 'webm' | 'm4a' | 'jpg' | 'png';
  size: string; // e.g. '124.5 MB'
  mimeType: string;
  type: 'video' | 'audio' | 'thumbnail';
  downloadUrl: string;
  bitrate?: string;
  fps?: number;
  hasAudio?: boolean;
}

export interface MediaInfoResult {
  title: string;
  author: string;
  authorAvatar?: string;
  thumbnail: string;
  duration: string;
  views?: string;
  platform: PlatformId;
  platformName: string;
  originalUrl: string;
  formats: MediaFormat[];
  aiSummary?: string;
  aiHighlights?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ToolItem {
  id: string;
  slug: string; // e.g. 'youtube-video-downloader', 'youtube-to-mp3'
  title: string;
  shortDescription: string;
  platform: PlatformId;
  category: CategoryId;
  iconName: string;
  badge?: string; // e.g. 'Popular', '4K Support', 'No Watermark'
  featured?: boolean;
  
  // SEO Page Specifics
  seoTitle: string;
  metaDescription: string;
  pageHeading: string;
  pageSubheading: string;
  howToUseSteps: { step: number; title: string; description: string }[];
  keyFeatures: string[];
  faqs: FaqItem[];
  supportedFormats: string[];
}

export interface DownloadHistoryItem {
  id: string;
  title: string;
  thumbnail: string;
  platform: PlatformId;
  formatSelected: string;
  downloadedAt: string;
  originalUrl: string;
}

export interface PlatformConfig {
  id: PlatformId;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  placeholderUrl: string;
  supportedTypes: string[];
}
