import { botaoSecundario, classeCartao } from "./estilos";

export function EsqueletoLista() {
  return (
    <div
      role="status"
      aria-label="Carregando usuários"
      className="flex flex-col gap-8"
    >
      <div
        className={`${classeCartao} h-72 animate-pulse motion-reduce:animate-none`}
      />
      <div className={`${classeCartao} flex flex-col gap-0 overflow-hidden`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex animate-pulse items-center gap-3 border-b border-zinc-200 p-4 last:border-b-0 motion-reduce:animate-none"
          >
            <span className="size-10 rounded-full bg-zinc-200" />
            <span className="flex flex-1 flex-col gap-2">
              <span className="h-3 w-40 rounded bg-zinc-200" />
              <span className="h-3 w-56 rounded bg-zinc-100" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ErroLista({
  mensagem,
  aoTentarDeNovo,
}: {
  mensagem: string;
  aoTentarDeNovo: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-6"
    >
      <p className="font-medium text-red-800">{mensagem}</p>
      <button
        type="button"
        onClick={aoTentarDeNovo}
        className={botaoSecundario}
      >
        Tentar de novo
      </button>
    </div>
  );
}
