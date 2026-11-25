// rodapé compartilhado do sistema
// card branco com os nomes da equipe + marca "SECTOR" translúcida cortada ao meio embaixo

export function Footer() {
  return (
    <footer className="w-full overflow-hidden px-4 pt-8">
      {/* marca d'água: o texto é desenhado inteiro, mas o container mostra só metade da altura */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative mt-[-2.2vw] select-none overflow-hidden
          text-center font-black uppercase leading-none tracking-wider"
        style={{
          fontSize: "clamp(4rem, 19vw, 22rem)",
          height: "0.7em",
          color: "rgba(0, 0, 0, 0.1)",
          // some gradualmente em direção ao fim
          maskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 20%, transparent 100%)",
        }}
      >
        SEKTOR
      </div>
    </footer>
  );
}
