// classes compartilhadas pelos componentes da tela de usuários

export const classeCartao =
  "rounded-2xl border border-zinc-200 bg-white shadow-lg";

export const classeRotulo = "text-sm font-medium text-zinc-800";

export const classeErro = "text-sm text-red-600";

export const classeCampo =
  "w-full rounded-2xl border border-zinc-300 bg-white px-4 py-2.5 hover:border-zinc-500 focus-visible:border-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600/25 aria-invalid:border-red-500";

const botaoBase =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export const botaoPrimario = `${botaoBase} bg-red-600 text-white hover:bg-red-700`;

export const botaoSecundario = `${botaoBase} border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100`;

export const focoVisivel =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2";
