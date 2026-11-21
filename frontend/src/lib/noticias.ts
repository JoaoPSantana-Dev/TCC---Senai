"use client";

import { useEffect, useState } from "react";
import { apiUrl } from "./paginas";

export interface Noticia {
  idNoticia: number;
  titulo: string;
  imagem: string;
}

export const tiposImagemAceitos = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
export const tamanhoMaximoImagem = 5 * 1024 * 1024; // igual no backend
export const tituloMaximoNoticia = 191;

export function imagemEhDeUpload(imagem: string) {
  return !/^(\/|https?:\/\/)/.test(imagem);
}

export function urlImagemNoticia(imagem: string) {
  return imagemEhDeUpload(imagem)
    ? `${apiUrl}/uploads/noticias/${imagem}`
    : imagem;
}

export function validarArquivoImagem(arquivo: File): string | null {
  if (!tiposImagemAceitos.includes(arquivo.type)) {
    return "Envie uma imagem JPG, PNG, WEBP ou GIF";
  }
  if (arquivo.size > tamanhoMaximoImagem) {
    return `A imagem pode ter no máximo ${tamanhoMaximoImagem / 1024 / 1024}mb`;
  }
  return null;
}

export async function buscarNoticias(): Promise<Noticia[]> {
  const resposta = await fetch(`${apiUrl}/noticias`, { cache: "no-store" });
  if (!resposta.ok) throw new Error("Falha ao buscar as notícias");
  const dados: unknown = await resposta.json();
  return Array.isArray(dados) ? (dados as Noticia[]) : [];
}

// o painel do editor avisa o carrossel da pré-visualização que a lista mudou
export const eventoNoticiasAtualizadas = "noticias-atualizadas";

export function avisarNoticiasAtualizadas() {
  window.dispatchEvent(new CustomEvent(eventoNoticiasAtualizadas));
}

export function useNoticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;

    const carregar = () =>
      buscarNoticias()
        .then((lista) => ativo && setNoticias(lista))
        .catch(() => {})
        .finally(() => ativo && setCarregando(false));

    carregar();
    window.addEventListener(eventoNoticiasAtualizadas, carregar);
    return () => {
      ativo = false;
      window.removeEventListener(eventoNoticiasAtualizadas, carregar);
    };
  }, []);

  return { noticias, carregando };
}
