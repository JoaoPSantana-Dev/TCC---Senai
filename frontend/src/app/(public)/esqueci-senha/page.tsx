import { EsqueciSenhaForm } from "@/app/(public)/esqueci-senha/components/EsqueciSenhaForm";
import { EstruturaAdministradorPublic } from "@/components/shared/EstruturaLogin";
import { HeaderAutenticacao } from "@/components/shared/HeaderLogin";

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
