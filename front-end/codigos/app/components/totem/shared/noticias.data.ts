export interface Noticia {
  id: number;
  titulo: string;
  imagem: string;
}

export const noticias: Noticia[] = [
  {
    id: 1,
    titulo: "Notícia 1",
    imagem: "/tubarao.png",
  },
  {
    id: 2,
    titulo: "Notícia 2",
    imagem: "/tubarao.png",
  },
];
