export default function FooterComponent(props: any) {
  return (
    <footer className="flex items-end justify-end bg-red-600 text-white py-6 text-center gap-4">
      <div className="container mx-auto px-4 flex flex-col items-center gap-4">
        <p className="text-sm font-medium">© 2026 Sector</p>
        <div>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs opacity-90">
            <li className="hover:no-underline cursor-pointer">João Paulo</li>
            <li className="hover:no-underline cursor-pointer">Thalles Vinicius</li>
            <li className="hover:no-underline cursor-pointer">Eduardo</li>
            <li className="hover:no-underline cursor-pointer">Tomas</li>
            <li className="hover:no-underline cursor-pointer">João Pedro</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
