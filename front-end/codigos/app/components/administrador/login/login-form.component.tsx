import ImagemBotaoComponent from "../shared/imagem-botao.component";
//formulário de login que fica na parte direita da tela de login (ainda não funcional)

export function LoginFormComponent() {
  return (
    <form className="flex flex-col gap-4 pt-6">
      {/* cpf */}
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

      {/* senha */}
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

      {/* botão de login */}
      <div className="flex justify-center">
        <ImagemBotaoComponent nomeImagem="login_icon.svg" />
      </div>
    </form>
  );
}
