import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Página não encontrada...</h2>
      <p>Não temos essa página! Tente novamente</p>
      <Link href="/homepage">Voltar para a página inicial</Link>
    </div>
  );
}
