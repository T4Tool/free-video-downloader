import { ToolItem } from '../types';
import { ALL_TOOLS } from '../data/toolsData';

export function updateHeadMetadata(tool?: ToolItem | null) {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://omnigrab.app';
  const currentUrl = typeof window !== 'undefined' 
    ? (tool ? `${baseUrl}/#/${tool.slug}` : baseUrl)
    : baseUrl;

  const defaultTitle = 'Free Video Downloader - Online 4K MP4 & 320kbps MP3 Extractor';
  const defaultDesc = 'Free online video downloader for YouTube 4K, Instagram Reels, TikTok without watermark, Facebook, Twitter, and 20+ platforms. Fast, safe, and no app install required.';

  const title = tool ? `${tool.seoTitle} | Free Video Downloader` : defaultTitle;
  const description = tool ? tool.metaDescription : defaultDesc;
  const keywords = tool
    ? `${tool.title}, ${tool.platform} video downloader, download ${tool.platform} video, ${tool.supportedFormats.join(', ')}`
    : 'free video downloader, video downloader, youtube to mp3, instagram reels downloader, tiktok no watermark, 4k video downloader, online media extractor';

  // Update document title
  document.title = title;

  // Helper to set or create meta tag
  const setMetaTag = (selector: string, attrName: string, attrValue: string, content: string) => {
    let element = document.head.querySelector(selector) as HTMLMetaElement | null;
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attrName, attrValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // Helper to set canonical link
  const setCanonical = (href: string) => {
    let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  };

  // Standard Meta Tags
  setMetaTag('meta[name="description"]', 'name', 'description', description);
  setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
  setMetaTag('meta[name="robots"]', 'name', 'robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

  // Open Graph
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
  setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'Free Video Downloader');

  // Twitter Cards
  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);

  // Set Canonical
  setCanonical(currentUrl);

  // Inject / Update JSON-LD Schemas
  injectJsonLdSchema(tool, baseUrl, currentUrl);
}

function injectJsonLdSchema(tool: ToolItem | null | undefined, baseUrl: string, currentUrl: string) {
  // Remove existing JSON-LD scripts created by us
  const existingScripts = document.querySelectorAll('script[data-seo="json-ld"]');
  existingScripts.forEach((script) => script.remove());

  const schemas: object[] = [];

  // WebSite Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Free Video Downloader',
    'url': baseUrl,
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${baseUrl}/#/{search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  });

  // SoftwareApplication Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': tool ? tool.title : 'Free Video Downloader Engine',
    'operatingSystem': 'All (Web, iOS, Android, Windows, macOS)',
    'applicationCategory': 'MultimediaApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'ratingCount': '24890',
    },
  });

  if (tool) {
    // BreadcrumbList Schema
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': baseUrl,
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': tool.platform.toUpperCase(),
          'item': `${baseUrl}/#/${tool.platform}`,
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': tool.title,
          'item': currentUrl,
        },
      ],
    });

    // HowTo Schema
    if (tool.howToUseSteps && tool.howToUseSteps.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        'name': `How to use ${tool.title}`,
        'description': tool.metaDescription,
        'step': tool.howToUseSteps.map((s) => ({
          '@type': 'HowToStep',
          'position': s.step,
          'name': s.title,
          'text': s.description,
        })),
      });
    }

    // FAQPage Schema
    if (tool.faqs && tool.faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': tool.faqs.map((faq) => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer,
          },
        })),
      });
    }
  }

  // Append script tags to document head
  schemas.forEach((schemaObj) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo', 'json-ld');
    script.textContent = JSON.stringify(schemaObj);
    document.head.appendChild(script);
  });
}
