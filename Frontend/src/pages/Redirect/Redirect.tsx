import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IconLogo } from "../../assets/Icons";

export function Redirect() {
  const { linkEncurtado } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      if (!linkEncurtado) {
        navigate("/");
        return;
      }

      try {
        window.location.href = `http://localhost:3333/${linkEncurtado}`;
      } catch (err) {
        console.error("Erro ao redirecionar:", err);
        setError("Link não encontrado ou inválido");

        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    };

    redirectToOriginalUrl();
  }, [linkEncurtado, navigate]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center text-center space-y-6 px-8 sm:px-12 py-10 sm:py-16 rounded-lg bg-white max-w-xl mx-4">
          <IconLogo />
          <h1 className="text-2xl sm:text-3xl font-bold text-red-600">
            Erro no redirecionamento
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            {error}. Você será redirecionado para a página inicial.
          </p>
        </div>
      </div>
    );
  }

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
            href={`http://localhost:3333/${linkEncurtado}`}
            className="text-blue-base"
          >
            Acesse aqui
          </a>
        </p>
      </div>
    </div>
  );
}
