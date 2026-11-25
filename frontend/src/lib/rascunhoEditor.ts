"use client";

import { useCallback, useEffect, useState } from "react";

// o puck desmonta o painel da direita quando você clica fora do bloco
// aí tudo que tava digitado nos formulários se perdia
// aqui o rascunho fica guardado fora do componente e volta quando o painel reabre
// só some ao salvar, cancelar ou recarregar a página

const rascunhos = new Map<string, unknown>();

export function useRascunho<T>(chave: string, inicial: () => T) {
  const [valor, setValor] = useState<T>(() =>
    rascunhos.has(chave) ? (rascunhos.get(chave) as T) : inicial(),
  );

  useEffect(() => {
    rascunhos.set(chave, valor);
  }, [chave, valor]);

  const descartar = useCallback(() => {
    rascunhos.delete(chave);
  }, [chave]);

  return [valor, setValor, descartar] as const;
}
