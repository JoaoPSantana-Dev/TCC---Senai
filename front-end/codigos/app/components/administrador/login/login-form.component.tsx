import ImagemBotaoComponent from "../shared/imagem-botao.component";

// LoginFormComponent
// formulário de autenticação para o sistema administrativo
// recebe CPF e senha do usuário e disponibiliza o botão para envio

export function LoginFormComponent() {
  return (
    <form className="flex flex-col gap-4 pt-6">
      {/* campo para inserir o CPF do usuário. */}
      <div className="flex flex-col gap-1 ">
        <label htmlFor="cpf">CPF</label>
        <input
          type="text"
          name="cpf"
          placeholder="___.___.___-__"
          maxLength={14}
          inputMode="numeric"
          required
          className="border border-zinc-400 hover:border-zinc-800 p-4 rounded-2xl"
        />
      </div>

      {/* campo para inserir a senha do usuário. */}
      <div className="flex flex-col gap-1">
        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          name="senha"
          placeholder="Insira sua senha"
          required
          className="border border-zinc-400 hover:border-zinc-800 p-4 rounded-2xl"
        />
      </div>

      {/* botão de envio do formulário de autenticação. */}
      <div className="flex justify-center">
        <ImagemBotaoComponent nomeImagem="login_icon.svg" />
      </div>
    </form>
  );
}
