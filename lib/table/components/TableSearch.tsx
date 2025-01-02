"use client";

import { useTable } from '../context';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDebounce } from '../hooks/useDebounce';
import { useEffect, useState } from 'react';

export function TableSearch() {
  const { state, dispatch } = useTable();
  const [searchValue, setSearchValue] = useState(state.searchTerm);
  const debouncedSearch = useDebounce(searchValue, 300);

  useEffect(() => {
    dispatch({ type: 'SET_SEARCH', payload: debouncedSearch });
  }, [debouncedSearch, dispatch]);

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" style={{left:"8px"}} />
      <Input
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="px-8"
      />
    </div>
  );
}