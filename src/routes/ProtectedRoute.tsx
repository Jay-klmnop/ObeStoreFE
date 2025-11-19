// import { useAuthStore } from '@/features/auth';
// import { useEffect } from 'react';
// import { Outlet } from 'react-router-dom';

// export function ProtectedRoute() {
//   const isLoggedIn = useAuthStore((state) => !!state.access);
//   const openAuthModal = useAuthStore((state) => state.openAuthModal);

//   useEffect(() => {
//     if (!isLoggedIn) {
//       openAuthModal('login');
//     }
//   }, [isLoggedIn, openAuthModal]);

//   if (!isLoggedIn) return null;

//   return <Outlet />;
// }
