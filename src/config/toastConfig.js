export const toastOptions = {
  position: 'top-center',
  gutter: 8,
  toastOptions: {
    duration: 3000,
    style: {
      background: '#fff',
      color: '#333',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      padding: '16px',
      fontSize: '14px',
    },
    success: {
      duration: 3000,
      iconTheme: {
        primary: '#10B981',
        secondary: '#fff',
      },
    },
    error: {
      duration: 4000,
      iconTheme: {
        primary: '#EF4444',
        secondary: '#fff',
      },
    },
  }
};