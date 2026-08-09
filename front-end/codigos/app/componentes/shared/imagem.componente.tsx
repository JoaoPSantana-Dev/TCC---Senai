import Image from "next/image";

export default function Imagem() {
  return (
    <Image
      src="/senai-mariano-ferraz.png"
      alt="Logo SENAI Mariano Ferraz"
      width={1920}
      height={1080}
      className="w-full h-full object-cover"
    />
  );
}
