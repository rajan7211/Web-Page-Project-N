import { FiAlertTriangle, FiX } from 'react-icons/fi';
import { Button } from './button';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDangerous = false,
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-200"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
          {/* Header */}
          <div className={`px-6 py-4 border-b ${isDangerous ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isDangerous && (
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <FiAlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                )}
                <h2 className={`text-lg font-semibold ${isDangerous ? 'text-red-900' : 'text-slate-900'}`}>
                  {title}
                </h2>
              </div>
              <button
                onClick={onCancel}
                className="p-1 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <FiX className="h-5 w-5 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <p className={`text-sm ${isDangerous ? 'text-red-700' : 'text-slate-600'}`}>
              {message}
            </p>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-200 flex gap-3 bg-slate-50">
            <Button
              onClick={onCancel}
              disabled={isLoading}
              variant="outline"
              className="flex-1 rounded-lg"
            >
              {cancelText}
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isLoading}
              className={`flex-1 rounded-lg ${
                isDangerous
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isLoading ? 'Processing...' : confirmText}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}







