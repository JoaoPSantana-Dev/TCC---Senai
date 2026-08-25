export default function FooterComponent(props: any) {
  return (
    <footer className="w-full bg-red-600 text-white py-6 text-center">
      <div className="container mx-auto px-4 flex flex-col items-center gap-4">
        <p className="text-sm font-medium">© 2026 Sector</p>
        <div>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs opacity-90">
            {["João Paulo", "Thalles Vinicius", "Eduardo", "Tomas", "João Pedro"].map((nome) => (
              <li 
                key={nome}
                className="cursor-pointer transition-transform duration-100 
                  ease-in-out active:scale-110 active:font-bold active:opacity-100 
                  touch-manipulation py-1 px-2 rounded-md">
                {nome}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
