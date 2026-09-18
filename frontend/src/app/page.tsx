import { LoginForm } from "@/app/components/administrador/login/LoginForm";
import { EstruturaAdministradorPublic } from "@/app/components/administrador/shared/EstruturaAdministradorPublic";
import { HeaderAutenticacao } from "@/app/components/administrador/shared/HeaderAutenticacao";

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