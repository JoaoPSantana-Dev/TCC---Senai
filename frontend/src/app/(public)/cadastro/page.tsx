import { CadastroForm } from "@/app/(public)/cadastro/components/CadastroForm";
import { EstruturaAdministradorPublic } from "@/components/shared/EstruturaLogin";
import { HeaderAutenticacao } from "@/components/shared/HeaderLogin";

export default function Cadastro() {
  return (
    <EstruturaAdministradorPublic>
      <section className="w-full h-full lg:w-1/3 bg-white flex flex-col justify-center p-8 md:p-16">
        <HeaderAutenticacao
          h1="Cadastro"
          p="Cadastre seu usuário usando o email e senha do SENAI"
          className="mb-8"
        />
        <CadastroForm />
      </section>
    </EstruturaAdministradorPublic>
  );
}
