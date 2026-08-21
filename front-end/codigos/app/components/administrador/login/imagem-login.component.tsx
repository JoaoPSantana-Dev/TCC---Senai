import ImagemComponent from "../../shared/imagem.component";

// ImagemLoginComponent
// bloco visual da lateral esquerda da tela de login
// recebe o nome da imagem e o texto alternativo para exibir a identidade visual do ambiente escolar e reforçar a marca do projeto

interface ImagemLoginProps {
  nomeImagem: string;
  alt?: string;
}

export function ImagemLoginComponent({
  nomeImagem,
  alt = "Imagem de login",
}: ImagemLoginProps) {
  return (
    <aside className="hidden lg:flex lg:w-2/3 bg-white items-center justify-center border-r-2 border-gray-300">
      <ImagemComponent nomeImagem={nomeImagem} alt={alt} />
    </aside>
  );
}
