import toast from 'react-hot-toast';

export const showSuccess = (message) => toast.success(message);
export const showError = (message) => toast.error(message);
export const showPromise = (promise, messages) => toast.promise(promise, messages);