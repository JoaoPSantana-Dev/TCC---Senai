import ImagemComponent from "../../shared/imagem.component";

// HeaderLogo
// exibe o logo institucional do SENAI no centro do cabeçalho
// esse componente é reutilizado em todas as páginas do totem

export function HeaderLogo() {
  return (
    <figure className="justify-self-center">
      <ImagemComponent
        nomeImagem="senai-logo.png"
        alt="Imagem do logo SENAI"
        width={200}
        height={200}
      />
    </figure>
  );
}
