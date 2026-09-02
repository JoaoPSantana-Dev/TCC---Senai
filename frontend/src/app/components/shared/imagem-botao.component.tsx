import Image from "next/image";

// ImagemBotaoComponent
// botão reutilizável que pode ser adicionado junto com um texto

interface ImagemProps {
  texto?: string;
  nomeImagem: string;
  alt?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export function ImagemBotaoComponent({
  texto,
  nomeImagem,
  alt,
  disabled,
  className,
  onClick,
}: ImagemProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-3xl mt-2 duration-150 cursor-pointer ${className}`}
    >
      <Image
        src={`/${nomeImagem}`}
        alt={`${alt}`}
        width={20}
        height={20}
        className={`w-5 h-5 object-contain ${className}`}
        loading="eager"
      />
      <span>{texto}</span>
    </button>
  );
}
