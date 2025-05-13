// Define routes that require authentication
export const protectedRoutes = [
  "/api/create-checkout-session",
  "/api/custom-order",
  "/account",
  "/admin",
];

// Define public routes
export const publicRoutes = [
  "/",
  "/products",
  "/about",
  "/contact",
  "/custom-order"
];

// Check if a route is protected
export const isProtectedRoute = (path: string) => {
  return protectedRoutes.some(route => path.startsWith(route));
};

// Check if a route is public
export const isPublicRoute = (path: string) => {
  return publicRoutes.some(route => 
    path === route || path.startsWith(`${route}/`)
  );
}; 