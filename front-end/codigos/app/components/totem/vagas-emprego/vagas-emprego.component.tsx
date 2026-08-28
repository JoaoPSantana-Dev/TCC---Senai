import { VagasEmpregoMenuComponent } from "./vagas-emprego-menu.component";

export function VagasEmpregoComponent() {
  return (
    <section className="min-h-auto flex flex-col items-center justify-center">
      <h1 className="text-center text-2xl font-semibold my-2 pb-8">
        Oportunidades de emprego
      </h1>
      <VagasEmpregoMenuComponent />
    </section>
  );
}
