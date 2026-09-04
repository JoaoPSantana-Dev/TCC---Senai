// FooterComponent
// rodapé compartilhado do sistema

export function FooterComponent() {
  return (
    <footer className="w-full flex bg-white text-black py-2 text-center border-t-2 border-gray-300 pb-4">
      <div className="container mx-auto px-4 flex flex-col items-center gap-4">
        <p className="text-sm font-medium">© 2026 Sector</p>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs opacity-90">
          {[
            "João Paulo",
            "Thalles Vinicius",
            "Eduardo",
            "Tomás Eugenio",
            "João Pedro",
          ].map((nome) => (
            <li
              key={nome}
              className="cursor-pointer transition-transform duration-100 ease-in-out
                active:scale-110 active:font-bold active:opacity-100 touch-manipulation
                py-1 px-2 rounded-md"
            >
              {nome}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
