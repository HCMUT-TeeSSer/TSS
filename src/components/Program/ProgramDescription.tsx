// components/Program/ProgramDescription.tsx
import { BookOpen } from "lucide-react";

interface ProgramDescriptionProps {
  description: string;
  department: string;
}

export default function ProgramDescription({ description, department }: ProgramDescriptionProps) {
  return (
    <div className='rounded-xl border border-gray-100 bg-white p-6'>
      <h3 className='mb-3 flex items-center gap-2 text-lg font-bold'>
        <BookOpen className='h-5 w-5 text-blue-600' />
        Mô tả chi tiết
      </h3>
      <p className='leading-relaxed text-gray-600'>{description}</p>
      <div className='mt-4 rounded-lg bg-gray-50 p-4'>
        <p className='text-sm text-gray-500'>
          Khoa quản lý: <span className='font-medium text-gray-900'>{department}</span>
        </p>
      </div>
    </div>
  );
}
