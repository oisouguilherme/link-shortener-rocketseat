import { useParams } from "react-router-dom";
import { IconLogo } from "../../assets/Icons";

export function Redirect() {
  const { linkEncurtado } = useParams();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center text-center space-y-6 px-8 sm:px-12 py-10 sm:py-16 rounded-lg bg-white max-w-xl mx-4">
        <IconLogo />
        <h1 className="text-2xl sm:text-3xl font-bold text-cinza-600">
          Redirecionando...
        </h1>
        <p className="text-cinza-500 text-sm sm:text-base">
          O link será aberto automaticamente em alguns instantes. Não foi
          redirecionado?{" "}
          <a
            href={`https://brev.ly/${linkEncurtado}`}
            className="text-blue-base"
          >
            Acesse aqui
          </a>
        </p>
      </div>
    </div>
  );
}
