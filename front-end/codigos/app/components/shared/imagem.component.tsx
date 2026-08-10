import Image from "next/image";

interface ImagemProps {
  nomeImagem: string;
  alt?: string;
}

export default function ImagemComponent({
  nomeImagem,
  alt = "Imagem",
}: ImagemProps) {
  return (
    <Image
      src={`/${nomeImagem}`}
      alt={alt}
      width={1920}
      height={1080}
      className="w-full h-full object-cover"
      loading="eager"
    />
  );
}
