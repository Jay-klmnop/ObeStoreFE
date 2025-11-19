import { useLocation, useNavigate } from 'react-router-dom';
import { useDebounce, useSearchStore } from '@/features/search';
import { useEffect } from 'react';

export function useSearchNavigation() {
  const { searchTerm, isOpenSearchModal } = useSearchStore();
  const navigate = useNavigate();
  const location = useLocation();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (!isOpenSearchModal) return;

    const currentQ = new URLSearchParams(location.search).get('q') ?? '';

    if (!debouncedSearchTerm && currentQ) {
      navigate('/products', { replace: true });
      return;
    }

    if (debouncedSearchTerm && currentQ !== debouncedSearchTerm) {
      navigate(`/products?q=${debouncedSearchTerm}`);
    }
  }, [debouncedSearchTerm, navigate, location.pathname, location.search]);
}
