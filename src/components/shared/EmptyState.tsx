import { FiInbox } from 'react-icons/fi';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  title = 'No data found',
  description = 'There are no items to display',
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-slate-300 mb-4">
        {icon || <FiInbox className="h-12 w-12" />}
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 mt-1 max-w-sm">{description}</p>
    </div>
  );
}


