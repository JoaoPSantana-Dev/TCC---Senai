import ImagemComponent from "../../shared/imagem.component";

// NavbarComponent
// botão de navegação do totem que representa o menu hambúrguer
// presente nas páginas internas para abrir o menu lateral e manter a navegação acessível em todas as páginas

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
