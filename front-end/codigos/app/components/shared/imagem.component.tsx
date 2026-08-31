import Image from "next/image";

// ImagemComponent
// componente reutilizável para renderizar imagens do projeto
// centraliza o uso do componente Next Image e permite personalizar largura, altura, texto alternativo e classes extras via props

interface ImagemProps {
  nomeImagem: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function ImagemComponent({
  nomeImagem,
  alt = "Imagem",
  width,
  height,
  className = "",
}: ImagemProps) {
  return (
    <Image
      src={`/${nomeImagem}`}
      alt={alt}
      width={width}
      height={height}
      className={`w-auto h-auto max-w-full object-contain ${className}`}
      loading="eager"
    />
  );
}
