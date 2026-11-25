import { CadastroForm } from "@/app/(public)/cadastro/components/CadastroForm";
import { EstruturaLogin } from "@/components/shared/EstruturaLogin";
import { HeaderAutenticacao } from "@/components/shared/HeaderLogin";

export default function Cadastro() {
  return (
    <EstruturaLogin>
      <section className="w-full h-full lg:w-1/3 bg-white flex flex-col justify-center p-8 md:p-16">
        <HeaderAutenticacao
          h1="Cadastro"
          p="Cadastre seu usuário usando o email e senha do SENAI"
          className="w-auto h-auto max-w-full object-contain mb-5"
        />
        <CadastroForm />
      </section>
    </EstruturaLogin>
  );
}
