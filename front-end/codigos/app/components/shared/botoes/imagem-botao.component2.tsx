import Image from "next/image";
import Link from "next/link";

interface ImagemProps {
  texto?: string;
  nomeImagem: string;
  alt?: string;
  href: string
}

export default function BotaoLoginComponent2({
  texto = "Click para começar",
  nomeImagem,
  alt = "Imagem",
  href,
}: ImagemProps) {
  return (
    <Link
      href={href}
      className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-3xl mt-2 duration-150"
    >
      <Image
        src={`/${nomeImagem}`}
        alt={alt}
        width={20}
        height={20}
        className="w-5 h-5 object-contain"
        loading="eager"
      />
      <span>{texto}</span>
    </Link>
  );
}

