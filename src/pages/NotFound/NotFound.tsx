import { IconNotFound } from "../../assets/Icons";

export function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center text-center space-y-6 px-8 sm:px-12 py-10 sm:py-16 rounded-lg bg-white max-w-xl mx-4">
        <IconNotFound />
        <h1 className="text-2xl sm:text-3xl font-bold text-cinza-600">
          Link não encontrado
        </h1>
        <p className="text-cinza-500 text-sm sm:text-base">
          O link que você está tentando acessar não existe, foi removido ou é
          uma URL inválida. Saiba mais em brev.ly.
        </p>
      </div>
    </div>
  );
}
