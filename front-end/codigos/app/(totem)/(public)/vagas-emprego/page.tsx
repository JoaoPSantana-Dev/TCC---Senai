import FooterComponent from "@/app/components/shared/footer.component";
import { HeaderComponent } from "@/app/components/totem/shared/header.component";
import { NoticiasComponent } from "@/app/components/totem/shared/noticias.component";
import { VagasEmpregoComponent } from "@/app/components/totem/vagas-emprego/vagas-emprego.component";

export default function VagasEmprego() {
  return (
    <main className="w-screen h-screen flex flex-col">
      <HeaderComponent />

      <VagasEmpregoComponent />

      <NoticiasComponent />

      <FooterComponent />
    </main>
  );
}
