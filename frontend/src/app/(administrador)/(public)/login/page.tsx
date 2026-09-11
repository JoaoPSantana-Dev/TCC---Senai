import { LoginComponent } from "@/app/components/administrador/login/login.component";
import { EstruturaAdministradorPublicComponent } from "@/app/components/administrador/shared/estrutura-administrador-public.component";

export default function Login() {
  return (
    <EstruturaAdministradorPublicComponent>
      <LoginComponent />
    </EstruturaAdministradorPublicComponent>
  );
}
