import { HeaderComponent } from "../shared/header.component";
import { NoticiasComponent } from "../shared/noticias.component";

export function VagasEmpregoComponent() {
  return (
    <main className="min-h-auto flex flex-col items-center justify-center">
      <h1 className="text-center text-2xl font-semibold my-2 pb-8">
        Bem-vindo ao totem do SENAI Mariano Ferraz!
      </h1>
      <VagasEmpregoComponent />
      <NoticiasComponent />
    </main>
  );
}
