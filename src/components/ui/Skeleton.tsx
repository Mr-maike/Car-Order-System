export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  height?: number | string;
  width?: number | string;
}

export function Skeleton({ 
  className = '', 
  variant = 'rectangular', 
  height = '1em', 
  width = '100%' 
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  
  const variantClasses = {
    text: 'h-4',
    rectangular: '',
    circular: 'rounded-full'
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ height, width }}
      aria-label="Carregando..."
    />
  );
}