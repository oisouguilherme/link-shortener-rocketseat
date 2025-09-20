import { useParams } from "react-router-dom";

export function Redirect() {
  const { linkEncurtado } = useParams();

  return (
    <div>
      <h1>Redirecionando...</h1>
      <p>Link encurtado: {linkEncurtado}</p>
      {/* Aqui você implementará a lógica de redirecionamento */}
    </div>
  );
}
