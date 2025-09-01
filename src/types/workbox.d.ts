declare global {
  interface Window {
    workbox: {
      addEventListener: (event: string, callback: () => void) => void;
      register: () => void;
      waiting: ServiceWorker | null;
      controlling: ServiceWorker | null;
    };
  }
}

export {};
