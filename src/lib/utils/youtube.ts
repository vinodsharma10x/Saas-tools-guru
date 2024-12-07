export function getYouTubeEmbedUrl(url: string | null): string | null {
  if (!url) return null;

  try {
    const videoId = extractYouTubeVideoId(url);
    if (!videoId) return null;
    
    // Always use the embed URL with additional parameters for better compatibility
    return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`;
  } catch {
    return null;
  }
}

function extractYouTubeVideoId(url: string): string | null {
  // Handle different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}