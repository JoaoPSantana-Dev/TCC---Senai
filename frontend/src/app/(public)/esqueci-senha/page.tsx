import { EsqueciSenhaForm } from "@/app/(public)/esqueci-senha/components/EsqueciSenhaForm";
import { EstruturaAdministradorPublic } from "@/components/shared/EstruturaLogin";
import { HeaderAutenticacao } from "@/components/shared/HeaderLogin";

// sem ?token na URL: pede o email e envia o link
// com ?token=...: mostra o formulário de nova senha e é o link que chega por email

export default async function EsqueciSenha({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <EstruturaAdministradorPublic>
      <section className="w-full h-full lg:w-1/3 bg-white flex flex-col justify-center p-8 md:p-16">
        <HeaderAutenticacao
          h1={token ? "Criar nova senha" : "Esqueceu a senha?"}
          p={
            token
              ? "Escolha uma nova senha para a sua conta"
              : "Informe seu email e enviaremos um link para redefinir a senha"
          }
          className="mb-8"
        />
        <EsqueciSenhaForm token={token} />
      </section>
    </EstruturaAdministradorPublic>
  );
}
