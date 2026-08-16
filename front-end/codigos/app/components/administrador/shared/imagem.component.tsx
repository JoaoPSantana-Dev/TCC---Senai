import Image from "next/image";

interface ImagemProps {
  nomeImagem: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string; // essa propriedade faz com que seja possível adicionar classes do tailwind adicionais ao componente
}

export default function ImagemComponent({
  nomeImagem,
  alt = "Imagem",
  width = 1920,
  height = 1080,
  className = "",
}: ImagemProps) {
  return (
    <Image
      src={`/${nomeImagem}`}
      alt={alt}
      width={width}
      height={height}
      className={`w-auto h-auto max-w-full object-contain ${className}`} //configuração padrão da imagem + adicionais que podem ser passados
      loading="eager"
    />
  );
}
