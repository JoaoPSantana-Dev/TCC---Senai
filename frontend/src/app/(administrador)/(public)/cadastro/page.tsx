import { CadastroForm } from "@/app/components/administrador/cadastro/CadastroForm";
import { EstruturaAdministradorPublic } from "@/app/components/administrador/shared/EstruturaAdministradorPublic";
import { HeaderAutenticacao } from "@/app/components/administrador/shared/HeaderAutenticacao";

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
