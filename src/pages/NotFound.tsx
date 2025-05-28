
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="space-y-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-maiga-accent/20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-xl"></div>
          <h1 className="text-8xl font-bold bg-gradient-to-r from-maiga-accent to-maiga-highlight bg-clip-text text-transparent relative z-10">404</h1>
        </div>
        
        <div className="max-w-md space-y-2">
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">
            This page is under construction or doesn't exist. Please check back later.
          </p>
        </div>
        
        <Button asChild className="bg-maiga-accent hover:bg-maiga-accent/90 text-black font-medium">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
