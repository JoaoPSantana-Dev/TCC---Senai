import ImagemComponent from "./imagem.component";

export function ImagemLoginComponent() {
  return (
    <aside className="hidden md:flex md:w-2/3 bg-white items-center justify-center border-r-2 border-gray-300">
      <ImagemComponent
        nomeImagem="tubarao.png"
        alt="Foto da entrada da escola SENAI Mariano Ferraz"
      />
    </aside>
  );
}
