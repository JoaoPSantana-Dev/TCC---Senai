// FooterComponent
// rodapé compartilhado do sistema

export default function FooterComponent() {
  return (
    <footer className="w-full flex bg-white text-black py-2 text-center border-t-2 border-gray-300 pb-4">
      <div className="container mx-auto px-4 flex flex-col items-center gap-4">
        <p className="text-sm font-medium">© 2026 Sector</p>
        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs opacity-90">
          <li className="hover:no-underline cursor-pointer">Eduardo</li>
          <li className="hover:no-underline cursor-pointer">João Paulo</li>
          <li className="hover:no-underline cursor-pointer">João Pedro</li>
          <li className="hover:no-underline cursor-pointer">Thalles</li>
          <li className="hover:no-underline cursor-pointer">Tomás</li>
        </ul>
      </div>
    </footer>
  );
}
