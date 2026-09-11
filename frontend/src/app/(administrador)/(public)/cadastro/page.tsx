import { CadastroComponent } from "@/app/components/administrador/cadastro/cadastro.component";
import { EstruturaAdministradorPublicComponent } from "@/app/components/administrador/shared/estrutura-administrador-public.component";

export default function Cadastro() {
  return (
    <EstruturaAdministradorPublicComponent>
      <CadastroComponent />
    </EstruturaAdministradorPublicComponent>
  );
}
