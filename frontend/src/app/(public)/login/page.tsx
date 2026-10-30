import { LoginForm } from "@/app/(public)/login/components/LoginForm";
import { EstruturaAdministradorPublic } from "@/components/shared/EstruturaLogin";
import { HeaderAutenticacao } from "@/components/shared/HeaderLogin";

export default function Login() {
  return (
    <EstruturaAdministradorPublic>
      <section className="w-full h-full lg:w-1/3 bg-white flex flex-col justify-center p-8 md:p-16">
        <HeaderAutenticacao
          h1="Login"
          p="Entre usando seu email e senha cadastrados no sistema"
          className="mb-32"
        />
        <LoginForm />
      </section>
    </EstruturaAdministradorPublic>
  );
}
