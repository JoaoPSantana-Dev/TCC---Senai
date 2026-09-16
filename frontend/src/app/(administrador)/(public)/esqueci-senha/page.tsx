import { EsqueciSenhaComponent } from "@/app/components/administrador/esqueci-senha/esqueci-senha.component";
import { EstruturaAdministradorPublicComponent } from "@/app/components/administrador/shared/estrutura-administrador-public.component";

export default function Cadastro() {
  return (
    <EstruturaAdministradorPublicComponent>
      <EsqueciSenhaComponent />
    </EstruturaAdministradorPublicComponent>
  );
}
