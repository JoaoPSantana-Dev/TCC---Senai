import Image from "next/image";

// cabeçalho da área de autenticação do sistema
// apresenta o logo do SENAI, o título da tela e a orientação do usuário

interface HeaderAutenticacaoProps {
  h1?: string; // título
  p?: string; // texto
  className?: string;
}

export function HeaderAutenticacao({
  h1,
  p,
  className,
}: HeaderAutenticacaoProps) {
  return (
    <header className="flex flex-col gap-2">
      <figure className={className}>
        <Image
          src="/senai-logo.png"
          alt="Imagem do logo SENAI"
          width={1920}
          height={1080}
          className="w-auto h-auto max-w-full object-contain"
          loading="eager"
        />
      </figure>

      <h1 className="text-lg font-bold">{h1}</h1>
      <p className="text-gray-600 text-sm">{p}</p>
    </header>
  );
}
