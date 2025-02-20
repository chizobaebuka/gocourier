import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateTrackingNumber(description: string): string {
  const firstWord = description.split(" ")[0].toUpperCase();
  const randomCode = Math.floor(1000000 + Math.random() * 9000000); 
  return `${firstWord}-${randomCode}`;
}

// Reverse geocoding using Geoapify API
export async function getAddressFromCoordinates(lat: number, lon: number): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${apiKey}`;

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data.features && data.features.length > 0) {
          return data.features[0].properties.formatted ?? "Address not found";
      }

      return "Address not found";
  } catch (error) {
      console.error("Error fetching address:", error);
      return "Error retrieving address";
  }
}

export async function getRouteFromCoordinates(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number
): Promise<[number, number][]> {
  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
  const url = `https://api.geoapify.com/v1/routing?waypoints=${startLat},${startLng}|${endLat},${endLng}&mode=drive&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Routing API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log({ data });

    if (data.features && data.features.length > 0) {
      const coordinates: [number, number][][] = data.features[0].geometry.coordinates;

      // Extract the first line (to convert MultiLineString -> LineString)
      return coordinates[0] ?? []; 
    }
    
    return []; // Return empty array if no route is found
  } catch (error) {
    console.error("Error fetching route:", error);
    return [];
  }
}

export async function getCoordinatesFromAddress(address: string) {
  try {
      // Construct the URL with proper query parameters
      const apiUrl = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&lang=en&limit=5&format=json&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`;

      // Fetch data from Geoapify
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error(`Geoapify API request failed with status: ${response.status}`);
      }

      const data = await response.json();

      // If no results found
      if (!data.results || data.results.length === 0) {
          throw new Error("Address not found or invalid");
      }

      // Get coordinates from the first result
      const result = data.results[0]; // Get the first result

      return {
          lat: result.lat, 
          lng: result.lon,
      };
  } catch (error) {
      console.error("Error fetching coordinates:", error);
      throw new Error("Failed to fetch coordinates");
  }
}
