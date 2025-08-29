interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorMessage({
  title = "Erro",
  message,
  onRetry,
  retryLabel = "Tentar Novamente"
}: ErrorMessageProps) {
  return (
    <div 
      className="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
      role="alert"
      aria-live="polite"
    >
      <div className="text-red-600 mb-3">
        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-red-800 mb-2">{title}</h3>
      <p className="text-red-600 mb-4">{message}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}