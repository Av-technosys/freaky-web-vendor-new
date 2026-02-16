let url = import.meta.env.VITE_BACKEND_URL || "";
export const VITE_GOOGLE_MAPS_API_KEY: string = import.meta.env.VITE_GOOGLE_MAPS_API_KEY!;

// Fix common typo where slashes are missing after protocol
if (url.startsWith("http:") && !url.startsWith("http://")) {
    url = url.replace("http:", "http://");
}
if (url.startsWith("https:") && !url.startsWith("https://")) {
    url = url.replace("https:", "https://");
}

export const VITE_BACKEND_URL = url;