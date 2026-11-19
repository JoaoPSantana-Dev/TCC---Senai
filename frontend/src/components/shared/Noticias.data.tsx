export interface Noticia {
  id: number;
  imagem: string;
  titulo: string;
}

export const noticias: Noticia[] = [
  {
    id: 1,
    imagem: "/encontro-unesco-unevoc.webp",
    titulo:
      "Fiesp e SENAI-SP sediam encontro global da UNESCO-UNEVOC inédito na América Latina",
  },
  {
    id: 2,
    imagem: "/reforma-tributaria.png",
    titulo:
      "Fiesp e SENAI-SP lançam curso gratuito para apoiar empresas na adaptação à Reforma Tributária",
  },
  {
    id: 3,
    imagem: "/operacao-robo-submarino.png",
    titulo:
      "Robô submarino OceanOneK realiza operação inédita no Hemisfério Sul, em Santos",
  },
  {
    id: 4,
    imagem: "/festa.webp",
    titulo: "Festa",
  },
];
