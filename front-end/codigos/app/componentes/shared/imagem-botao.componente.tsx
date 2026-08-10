import Image from "next/image";

interface ImagemProps {
  texto?: string;
  nomeImagem: string;
  alt?: string;
}

export default function BotaoLogin({
  texto = "Entrar",
  nomeImagem,
  alt = "Imagem",
}: ImagemProps) {
  return (
    <button
      type="submit"
      className="w-1/2 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-3xl mt-2 duration-150"
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
    </button>
  );
}
