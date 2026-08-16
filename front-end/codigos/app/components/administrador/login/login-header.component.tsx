import ImagemComponent from "../shared/imagem.component";

export function LoginHeaderComponent() {
  return (
    // header do login que tem o logo do senai, o título e a descrição
    <header className="flex flex-col gap-2">
      <figure className="mb-32">
        <ImagemComponent
          nomeImagem="senai-logo.png"
          alt="Imagem do logo SENAI"
        />
      </figure>

      <h1 className="text-lg font-bold">Login</h1>
      <p className="text-gray-600 text-sm">
        Entre usando seu CPF e senha cadastrados no sistema
      </p>
    </header>
  );
}
