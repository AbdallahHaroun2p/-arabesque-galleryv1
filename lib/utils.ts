import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Ensures a URL is absolute by adding the origin if necessary
 * @param url The URL to ensure is absolute
 * @param origin The origin to use when converting relative URLs
 * @returns An absolute URL
 */
export function ensureAbsoluteUrl(url: string | undefined | null, origin: string): string | undefined {
  if (!url) return undefined;
  
  try {
    // Check if the URL already has a protocol
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // Fix the URL path to ensure it starts with a forward slash
    const path = url.startsWith('/') ? url : `/${url}`;
    
    // Ensure the origin doesn't end with a slash
    const baseUrl = origin.endsWith('/') ? origin.slice(0, -1) : origin;
    
    return `${baseUrl}${path}`;
  } catch (error) {
    console.error('Error creating absolute URL:', error);
    return undefined;
  }
}

/**
 * Formats a price in cents to a currency string
 * @param price The price in cents
 * @returns A formatted currency string
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100)
}
