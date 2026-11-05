"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ImagemBotao } from "@/components/shared/ImagemBotao";
import { toast } from "sonner";
import Link from "next/link";
import { mensagemDoBackend } from "@/lib/autenticacao";
import { InputSenha } from "@/components/shared/InputSenha";
import { useState, type FormEvent } from "react";

const schemaLogin = z.object({
  email: z.email("Endereço de email inválido"),
  senha: z.string().min(1, "Informe a senha"),
});

type LoginFormData = z.infer<typeof schemaLogin>;

export function LoginForm() {
  const [etapa, setEtapa] = useState<"senha" | "codigo">("senha");

  if (etapa === "codigo") {
    return <EtapaCodigo onReiniciar={() => setEtapa("senha")} />;
  }
  return <EtapaSenha onPrecisaCodigo={() => setEtapa("codigo")} />;
}

export function EtapaSenha({
  onPrecisaCodigo,
}: {
  onPrecisaCodigo: () => void;
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    resetField,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const resposta = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const dados = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        toast.error(mensagemDoBackend(dados, "Email ou senha incorretos"));
        resetField("senha");
        setFocus("senha");
        return;
      }

      if (dados.precisa2fa) {
        onPrecisaCodigo();
        return;
      }

      router.push("/homepage");
      router.refresh();
    } catch {
      toast.error("Falha ao conectar com o servidor");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4 pt-6"
    >
      {/* campo para inserir o email do usuário */}
      <div className="flex flex-col gap-1 ">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          {...register("email")}
          className="border border-zinc-400 hover:border-zinc-800 p-4 rounded-2xl"
          placeholder="Digite seu email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* campo para inserir a senha do usuário */}
      <InputSenha
        id="senha"
        rotulo="Senha"
        autoComplete="current-password"
        placeholder="Insira sua senha"
        erro={errors.senha?.message}
        {...register("senha")}
      />

      {/* botão de envio do formulário de autenticação */}
      <div className="flex items-start justify-center space-y-6">
        <ImagemBotao
          nomeImagem="login_icon.svg"
          texto={isSubmitting ? "Entrando..." : "Entrar"}
        />
      </div>

      <ul className="flex items-start justify-center space-x-20 space-y-6">
        <li>
          <Link href="/cadastro" className="hover:text-red-600">
            Criar uma conta
          </Link>
        </li>

        <li>|</li>

        <li>
          <Link href="/esqueci-senha" className="hover:text-red-600">
            Recuperar senha
          </Link>
        </li>
      </ul>
    </form>
  );
}

function EtapaCodigo({ onReiniciar }: { onReiniciar: () => void }) {
  const router = useRouter();
  const [codigo, setCodigo] = useState("");
  const [usarRecuperacao, setUsarRecuperacao] = useState(false);
  const [enviando, setEnviando] = useState(false);

  async function enviar(e: FormEvent) {
    e.preventDefault();
    if (!codigo.trim()) return;

    setEnviando(true);
    try {
      const resposta = await fetch("/api/auth/login-2fa", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ codigo }),
      });
      const dados = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        toast.error(mensagemDoBackend(dados, "Código inválido ou expirado"));
        if (dados.reiniciar) {
          onReiniciar(); // passou de 5 minutos volta pro email e senha
          return;
        }
        setCodigo("");
        return;
      }

      router.push("/homepage");
      router.refresh();
    } catch {
      toast.error("Falha ao conectar com o servidor");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={enviar} className="flex flex-col gap-4 pt-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold">Verificação em duas etapas</h2>
        <p className="text-sm text-zinc-600">
          {usarRecuperacao
            ? "Digite um dos seus códigos de recuperação. Cada código só funciona uma vez"
            : "Digite o código de 6 dígitos que aparece no seu aplicativo autenticador"}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="codigo">
          {usarRecuperacao ? "Código de recuperação" : "Código do aplicativo"}
        </label>
        <input
          id="codigo"
          type="text"
          autoFocus
          autoComplete="one-time-code"
          inputMode={usarRecuperacao ? "text" : "numeric"}
          maxLength={usarRecuperacao ? 11 : 6}
          value={codigo}
          onChange={(e) =>
            setCodigo(
              usarRecuperacao
                ? e.target.value
                : e.target.value.replace(/\D/g, ""),
            )
          }
          className="border border-zinc-400 hover:border-zinc-800 p-4 rounded-2xl text-center text-xl tracking-widest"
          placeholder={usarRecuperacao ? "xxxxx-xxxxx" : "000000"}
        />
      </div>

      <ImagemBotao
        nomeImagem="login_icon.svg"
        texto={enviando ? "Verificando..." : "Verificar"}
        disabled={enviando}
      />

      <div className="flex flex-col items-center gap-2 text-sm">
        <button
          type="button"
          onClick={() => {
            setUsarRecuperacao((atual) => !atual);
            setCodigo("");
          }}
          className="hover:text-red-600 cursor-pointer"
        >
          {usarRecuperacao
            ? "Usar o código do aplicativo"
            : "Usar um código de recuperação"}
        </button>
        <button
          type="button"
          onClick={onReiniciar}
          className="text-zinc-600 hover:text-red-600 cursor-pointer"
        >
          Voltar para o login
        </button>
      </div>
    </form>
  );
}
