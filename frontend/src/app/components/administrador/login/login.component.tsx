"use client";

import { LoginFormComponent } from "./login-form.component";
import { HeaderAutenticacaoComponent } from "../shared/header-autenticacao.component";

// LoginComponent
// estrutura principal da tela de login do painel administrativo
// na esquerda fica a imagem de identificação
// na direita fica o bloco de autenticação, com cabeçalho e formulário organizados em um layout responsivo
// embaixo, o rodapé

export function LoginComponent() {
  return (
    <section className="w-full h-full lg:w-1/3 bg-white flex flex-col justify-center p-8 md:p-16">
      <HeaderAutenticacaoComponent
        h1="Login"
        p="Entre usando seu email e senha cadastrados no sistema"
        className="mb-32"
      />

      <LoginFormComponent />
    </section>
  );
}
