import Image from "next/image";

// blocos simples de conteúdo para montar páginas no gerenciador
// título, subtítulo, texto, lista e imagem

const coluna = "mx-auto w-full max-w-3xl";

export function BlocoTitulo({ texto }: { texto: string }) {
  return (
    <h2 className={`${coluna} text-xl font-semibold text-zinc-800`}>{texto}</h2>
  );
}

export function BlocoSubtitulo({ texto }: { texto: string }) {
  return <h3 className={`${coluna} font-semibold text-red-600`}>{texto}</h3>;
}

interface BlocoTextoProps {
  texto: string;
  destaque?: boolean;
}

export function BlocoTexto({ texto, destaque = false }: BlocoTextoProps) {
  return (
    <p
      className={`${coluna} text-justify whitespace-pre-line 
        ${destaque ? "text-lg font-semibold text-zinc-800" : "text-zinc-600"}`}
    >
      {texto}
    </p>
  );
}

export function BlocoLista({ itens }: { itens: string }) {
  const linhas = itens
    .split(/\r?\n/)
    .map((linha) => linha.trim())
    .filter(Boolean);

  return (
    <ul className={`${coluna} pl-10 text-zinc-600 list-disc`}>
      {linhas.map((linha, indice) => (
        <li key={`${indice}-${linha}`} className="mb-1">
          {linha}
        </li>
      ))}
    </ul>
  );
}

interface BlocoImagemProps {
  nomeImagem: string;
  alt?: string;
}

export function BlocoImagem({ nomeImagem, alt = "" }: BlocoImagemProps) {
  return (
    <figure className={`${coluna} flex justify-center`}>
      <Image
        src={`/${nomeImagem}`}
        alt={alt}
        width={800}
        height={600}
        className="h-auto w-full max-w-xl rounded-xl border object-contain"
      />
    </figure>
  );
}
