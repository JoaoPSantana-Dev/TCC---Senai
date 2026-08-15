import ImagemComponent from "./imagem.component";

interface ImagemLoginProps {
  nomeImagem: string;
  alt?: string;
}

export function ImagemLoginComponent({
  nomeImagem,
  alt = "Imagem de login",
}: ImagemLoginProps) {
  return (
    <aside className="hidden md:flex md:w-2/3 bg-white items-center justify-center border-r-2 border-gray-300">
      <ImagemComponent nomeImagem={nomeImagem} alt={alt} />
    </aside>
  );
}
