import { Button } from '@/components/ui/button';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasNext,
  hasPrev,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200">
      <p className="text-sm text-slate-600">
        Page {currentPage} of {totalPages}
      </p>
      
<div className="flex gap-2">
  <Button
    variant="outline"
    size="sm"
    onClick={() => onPageChange(currentPage - 1)}
    disabled={!hasPrev}
    className="
      rounded-xl
      border-slate-200
      bg-white
      shadow-sm
      hover:shadow-md
      hover:-translate-y-0.5
      transition-all
      duration-200
    "
  >
    <FiChevronLeft className="h-4 w-4 mr-1" />
    Previous
  </Button>

  <Button
    variant="outline"
    size="sm"
    onClick={() => onPageChange(currentPage + 1)}
    disabled={!hasNext}
    className="
      rounded-xl
      border-slate-200
      bg-white
      shadow-sm
      hover:shadow-md
      hover:-translate-y-0.5
      transition-all
      duration-200
    "
  >
    Next
    <FiChevronRight className="h-4 w-4 ml-1" />
  </Button>
</div>
    </div>
  );
}



