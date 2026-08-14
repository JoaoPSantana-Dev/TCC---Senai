import Image from "next/image";

interface ImagemProps {
  nomeImagem: string;
  alt?: string;
  width?: number;
  height?: number;
}

export default function ImagemComponent({
  nomeImagem,
  alt = "Imagem",
  width = 1920,
  height = 1080,
}: ImagemProps) {
  return (
    <Image
      src={`/${nomeImagem}`}
      alt={alt}
      width={width}
      height={height}
      className="w-full h-full object-cover"
      loading="eager"
    />
  );
}
