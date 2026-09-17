import { EsqueciSenhaFormComponent } from "@/app/components/administrador/esqueci-senha/esqueci-senha-form.component";
import { EstruturaAdministradorPublicComponent } from "@/app/components/administrador/shared/estrutura-administrador-public.component";
import { HeaderAutenticacaoComponent } from "@/app/components/administrador/shared/header-autenticacao.component";

export default function Cadastro() {
  return (
    <EstruturaAdministradorPublicComponent>
      <section className="w-full h-full lg:w-1/3 bg-white flex flex-col justify-center p-8 md:p-16">
        <HeaderAutenticacaoComponent
          h1="Esqueceu a senha?"
          p="Insira sua nova senha e a confirme"
          className="mb-8"
        />
        <EsqueciSenhaFormComponent />
      </section>
    </EstruturaAdministradorPublicComponent>
  );
}
