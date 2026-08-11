import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Página não encontrada...</h2>
      <p>Não temos essa página! Tente voltar para a página de login</p>
      <Link href="/login">Voltar para o login</Link>
    </div>
  );
}
