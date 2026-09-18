import { Imagem } from "../../shared/Imagem";

// exibe o logo institucional do SENAI no centro do cabeçalho
// esse componente é reutilizado em todas as páginas do totem

export function HeaderLogo() {
  return (
    <figure className="flex justify-center p-4">
      <Imagem
        nomeImagem="senai-logo.png"
        alt="Imagem do logo SENAI"
        width={200}
        height={200}
      />
    </figure>
  );
}
