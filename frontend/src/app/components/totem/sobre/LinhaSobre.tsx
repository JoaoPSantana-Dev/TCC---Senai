import { Imagem } from "../../shared/Imagem";

type LinhaSobreProps = {
  texto: string;
  nomeImagem: string;
  alt?: string;
  primeiroEstilo: boolean;
};

export function LinhaSobre({
  texto,
  nomeImagem,
  alt = "Imagem",
  primeiroEstilo,
}: LinhaSobreProps) {
  if (primeiroEstilo == false) {
    return (
      <article className="grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch">
        <figure className="relative min-h-80 overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-150 ease-in-out active:scale-[0.98] active:shadow-lg active:brightness-95 touch-manipulation select-none">
          <Imagem nomeImagem={nomeImagem} alt={alt} fill />
        </figure>

        <div className="flex items-center justify-center rounded-3xl bg-white p-8 text-zinc-700 shadow-sm min-h-80 transition-all duration-150 ease-in-out active:scale-[0.98] active:shadow-lg active:brightness-95 touch-manipulation select-none">
          <p className="text-center text-base md:text-lg font-medium leading-relaxed">
            {texto}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch">
      <div className="flex items-center justify-center rounded-3xl bg-white p-8 text-zinc-700 shadow-sm min-h-80 transition-all duration-150 ease-in-out active:scale-[0.98] active:shadow-lg active:brightness-95 touch-manipulation select-none">
        <p className="text-center text-base md:text-lg font-medium leading-relaxed">
          {texto}
        </p>
      </div>

      <figure className="relative min-h-80 overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-150 ease-in-out active:scale-[0.98] active:shadow-lg active:brightness-95 touch-manipulation select-none">
        <Imagem nomeImagem={nomeImagem} alt={alt} fill />
      </figure>
    </article>
  );
}
