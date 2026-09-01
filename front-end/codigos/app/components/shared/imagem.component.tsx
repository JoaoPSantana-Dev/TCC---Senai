import Image from "next/image";

// ImagemComponent
// componente reutilizável para renderizar imagens do projeto
// centraliza o uso do componente Next Image e permite personalizar largura, altura, texto alternativo e classes extras via props

interface ImagemProps {
  nomeImagem: string;
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
}

export default function ImagemComponent({
  nomeImagem,
  alt = "Imagem",
  width = 1920,
  height = 1080,
  fill = false,
  className = ""
}: ImagemProps) {
  if (fill) {
    return (
      <Image
        src={`/${nomeImagem}`}
        alt={alt}
        fill
        sizes="(max-width: 768) 100vw, 50vw"
        className={`object-cover ${className}`}
        loading="eager"
      />
    );
  }
  return (
    <Image
      src={`/${nomeImagem}`}
      alt={alt}
      width={width || 200}
      height={height || 200}
      className={`h-auto w-auto object-cover ${className}`}
      loading="eager"
    />
  );
}

{/*import Image from "next/image";

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
      className={`w-auto h-auto max-w-full object-contain ${className}`} //configuração padrão da imagem + adicionais que podem ser passados
      className={`w-auto h-auto max-w-full object-contain ${className}`}
      loading="eager"
    />
  );
}*/}
