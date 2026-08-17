import FooterComponent from "@/app/components/totem/shared/footer.component";
import { HeaderComponent } from "@/app/components/totem/shared/header.component";
import { CardEmprego } from "@/app/components/totem/vagas-emprego/card-emprego";

export default function VagasEmprego() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col ">
        <HeaderComponent />

        <h1 className = "text-center">Vagas de Emprego</h1>
        <CardEmprego/>

        <footer className="fixed bottom-0 left-0 w-full">
        <FooterComponent />
        </footer>
      </div>
    </>
  );
}
