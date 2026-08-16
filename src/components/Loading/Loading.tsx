// Componente simples que exibe um spinner de carregamento

export function Loading() {
  return (
    <div
      className="flex justify-center py-12"
      role="status"
      aria-label="Loading user data..."
      aria-live="polite"
    >
      <span className="size-12 animate-spin rounded-full border-4 border-gray-600 border-t-blue-400" />
      <span className="sr-only">Loading user data...</span>
    </div>
  );
}
