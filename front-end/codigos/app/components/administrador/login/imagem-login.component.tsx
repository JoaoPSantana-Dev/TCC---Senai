import ImagemComponent from "../shared/imagem.component";
// componente que representa a imagem do login, que fica na parte esquerda da tela de login
// você pode passar o nome da imagem e o texto alternativo (opcional) como propriedades e mudar quando quiser

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
