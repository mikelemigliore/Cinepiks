import createWebStorage from 'redux-persist/lib/storage/createWebStorage'; //This utility creates a storage engine that works with either localStorage or sessionStorage

// Check if window is defined (for SSR compatibility)
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(value: any) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

// Use localStorage only on the client side (Next.js SSR compatibility)
const storage = typeof window !== 'undefined' 
    ? createWebStorage('local') 
    : createNoopStorage();

export default storage;


// You're including this in your web app to persist data (like watchlists, preferences, and tokens) across page reloads using localStorage. 
// It ensures SSR compatibility in Next.js by using a dummy storage when localStorage isn't available on the server, 
// preventing errors. This helps maintain user data and preferences without breaking the app during server-side rendering.