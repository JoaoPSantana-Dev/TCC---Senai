"use client";

import FooterComponent from "../../shared/footer.component";
import { ImagemLoginComponent } from "./imagem-login.component";
import { LoginFormComponent } from "./login-form.component";
import { LoginHeaderComponent } from "./login-header.component";

export function LoginComponent() {
  return (
    <>
      {/* parte principal onde fica o bloco de imagem na esquerda e de login na direita */}
      <main className="flex flex-1 flex-col md:flex-row">
        {/* parte onde fica o bloco de imagem do login */}
        <ImagemLoginComponent
          nomeImagem="tubarao.png"
          alt="Foto da entrada da escola SENAI Mariano Ferraz"
        />

        {/* parte onde fica o bloco de login */}
        <section className="w-full h-full lg:w-1/3 bg-white flex flex-col justify-center p-8 md:p-16">
          <LoginHeaderComponent /> {/* componente do header */}
          <LoginFormComponent /> {/* componente do formulário de login */}
        </section>
      </main>

      <div className="mt-auto">
        {/* parte onde fica o rodapé */}
        <FooterComponent />
      </div>
    </>
  );
}
