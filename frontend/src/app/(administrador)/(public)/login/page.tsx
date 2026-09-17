import { LoginFormComponent } from "@/app/components/administrador/login/login-form.component";
import { EstruturaAdministradorPublicComponent } from "@/app/components/administrador/shared/estrutura-administrador-public.component";
import { HeaderAutenticacaoComponent } from "@/app/components/administrador/shared/header-autenticacao.component";

export default function Login() {
  return (
    <EstruturaAdministradorPublicComponent>
      <section className="w-full h-full lg:w-1/3 bg-white flex flex-col justify-center p-8 md:p-16">
        <HeaderAutenticacaoComponent
          h1="Login"
          p="Entre usando seu email e senha cadastrados no sistema"
          className="mb-32"
        />
        <LoginFormComponent />
      </section>
    </EstruturaAdministradorPublicComponent>
  );
}
