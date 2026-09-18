import { EsqueciSenhaForm } from "@/app/components/administrador/esqueci-senha/EsqueciSenhaForm";
import { EstruturaAdministradorPublic } from "@/app/components/administrador/shared/EstruturaAdministradorPublic";
import { HeaderAutenticacao } from "@/app/components/administrador/shared/HeaderAutenticacao";

export default function Cadastro() {
  return (
    <EstruturaAdministradorPublic>
      <section className="w-full h-full lg:w-1/3 bg-white flex flex-col justify-center p-8 md:p-16">
        <HeaderAutenticacao
          h1="Esqueceu a senha?"
          p="Insira sua nova senha e a confirme"
          className="mb-8"
        />
        <EsqueciSenhaForm />
      </section>
    </EstruturaAdministradorPublic>
  );
}
