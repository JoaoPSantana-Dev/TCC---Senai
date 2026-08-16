import ImagemComponent from "../../administrador/imagem.component";

export function NavbarComponent() {
  return (
    <nav className="flex justify-start text-black ml-4">
      <ImagemComponent
        nomeImagem="menu_icon.svg"
        width={100}
        height={100}
        className="cursor-pointer"
      />
    </nav>
  );
}
