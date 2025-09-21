import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IconLogo } from "../../assets/Icons";

export function Redirect() {
  const { linkEncurtado } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      if (!linkEncurtado) {
        navigate("/404", { replace: true });
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));

      window.location.href = `http://localhost:3333/${linkEncurtado}`;
    };

    redirectToOriginalUrl();
  }, [linkEncurtado, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center text-center space-y-6 px-8 sm:px-12 py-10 sm:py-16 rounded-lg bg-white max-w-xl mx-4">
        <IconLogo />
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <h1 className="text-2xl sm:text-3xl font-bold text-cinza-600">
          Redirecionando...
        </h1>
        <p className="text-cinza-500 text-sm sm:text-base">
          Aguarde, você será redirecionado em instantes.
        </p>
      </div>
    </div>
  );
}
