import ImagemComponent from "../../administrador/shared/imagem.component";
// componente que representa a barra de navegação do totem e fica em todas as páginas menos a homepage, é as três barras que ao clicar abre o menu hambúrguer (ainda não funcional)

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
