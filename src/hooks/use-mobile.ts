
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);
    
    // Initial check
    updateMatches();
    
    // Listen for changes
    mediaQuery.addEventListener("change", updateMatches);
    
    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", updateMatches);
    };
  }, [query]);

  return matches;
}

// Add useIsMobile convenience hook
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 768px)");
}
