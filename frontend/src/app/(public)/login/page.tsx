import { LoginForm } from "@/app/(public)/login/components/LoginForm";
import { EstruturaAdministradorPublic } from "@/components/shared/EstruturaLogin";
import { HeaderAutenticacao } from "@/components/shared/HeaderLogin";
import { cookies } from "next/headers";

export async function testCookie() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  console.log(session?.value);
  console.log(Object(session?.value).funcao);
}

export async function logOut() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

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
