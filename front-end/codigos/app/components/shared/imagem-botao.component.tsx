import Image from "next/image";
import Link from "next/link";

interface ImagemProps {
  texto?: string;
  nomeImagem: string;
  alt?: string;
  href: string
}

export default function BotaoLoginComponent({
  texto = "Entrar",
  nomeImagem,
  alt = "Imagem",
  href,
}: ImagemProps) {
  return (
    <Link
      href={href}
      className="w-full flex items-center justify-center gap-2 bg-red-600 text-white 
        px-6 py-3 rounded-3xl mt-2 transition-all duration-100 ease-in-out active:scale-95
        active:brightness-90 touch-manipulation select-none cursor-pointer"
    >
      <Image
        src={`/${nomeImagem}`}
        alt={alt}
        width={20}
        height={20}
        className="w-5 h-5 object-contain pointer-events-none"
        loading="eager"
      />
      <span className="pointer-events-none font-medium">{texto}</span>
    </Link>
  );
}
