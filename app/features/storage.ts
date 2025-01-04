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