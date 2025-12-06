// components/Program/ProgramBreadcrumb.tsx
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface ProgramBreadcrumbProps {
  backLink: string;
  backLabel?: string;
  currentTitle: string;
}

export default function ProgramBreadcrumb({
  backLink,
  backLabel = "Chương trình của tôi",
  currentTitle,
}: ProgramBreadcrumbProps) {
  return (
    <div className='border-b bg-white'>
      <div className='container mx-auto flex items-center px-4 py-3 text-sm text-gray-500'>
        <Link to={backLink} className='hover:text-indigo-600'>
          {backLabel}
        </Link>
        <ChevronRight className='mx-2 h-4 w-4' />
        <span className='max-w-xs truncate font-medium text-gray-900'>{currentTitle}</span>
      </div>
    </div>
  );
}
