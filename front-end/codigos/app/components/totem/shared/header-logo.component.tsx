import ImagemComponent from "../../administrador/shared/imagem.component";

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
