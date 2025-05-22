"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <h2 className="text-2xl mb-4">Ocorreu um erro inesperado.</h2>
      <button
        className="bg-[#1A222F] px-4 py-2 rounded"
        onClick={() => reset()}
      >
        Tentar novamente
      </button>
    </div>
  );
}
