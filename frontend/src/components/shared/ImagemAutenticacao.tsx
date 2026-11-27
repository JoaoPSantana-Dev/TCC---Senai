import Image from "next/image";

// bloco visual da lateral esquerda da tela de login
// recebe o nome da imagem e o texto alternativo para exibir a identidade visual do ambiente escolar e reforçar a marca do projeto

interface ImagemAutenticacaoProps {
  nomeImagem: string;
  alt?: string;
  className?: string;
}

export function ImagemAutenticacao({
  nomeImagem,
  alt = "Imagem de login",
  className = "",
}: ImagemAutenticacaoProps) {
  return (
    <aside className="relative hidden lg:block lg:w-2/3 border-r-2 border-gray-300">
      <Image
        src={`/${nomeImagem}`}
        alt={alt}
        fill
        priority
        sizes="(min-width: 1024px) 67vw, 0px"
        className={`object-cover ${className}`}
      />
    </aside>
  );
}
