import { useLocation, useNavigate } from 'react-router-dom';
import { useDebounce, useSearchStore } from '@/features/search';
import { useEffect } from 'react';

export function useSearchNavigation() {
  const { searchTerm } = useSearchStore();
  const navigate = useNavigate();
  const location = useLocation();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm && location.search !== `?q=${debouncedSearchTerm}`) {
      navigate(`/products?q=${debouncedSearchTerm}`);
    }
  }, [debouncedSearchTerm, navigate, location.search]);
}
