import Image from "next/image";

interface ImagemProps {
  nomeImagem: string;
  alt?: string;
}

export default function ImagemLogoComponent({
  nomeImagem,
  alt = "Imagem",
}: ImagemProps) {
  return (
    <Image
      src={`/${nomeImagem}`}
      alt={alt}
      width={220}
      height={110}
      className="w-full h-full object-cover"
      loading="eager"
    />
  );
}