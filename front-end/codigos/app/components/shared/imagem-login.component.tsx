import Imagem from "./imagem.component";

export function ImagemLogin() {
  return (
    <aside className="hidden md:flex md:w-2/3 bg-white items-center justify-center border-r-2 border-gray-300">
      <Imagem
        nomeImagem="tubarao.png"
        alt="Foto da entrada da escola SENAI Mariano Ferraz"
      />
    </aside>
  );
}
