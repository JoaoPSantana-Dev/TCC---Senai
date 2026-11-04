"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { ImagemBotao } from "@/components/shared/ImagemBotao";
import Link from "next/link";
import { InputSenha } from "@/components/shared/InputSenha";
import { apiUrl } from "@/lib/paginas";
import { mensagemDoBackend, schemaSenhaForte } from "@/lib/autenticacao";
import { ChecklistSenha } from "@/components/shared/ChecklistSenha";
import { useState } from "react";

export function EsqueciSenhaForm({ token }: { token?: string }) {
  return token ? <NovaSenha token={token} /> : <PedirLink />;
}

// ---------- passo 1: pedir o link por email ----------

const schemaEmail = z.object({
  email: z.email("Endereço de email inválido"),
});
type EmailFormData = z.infer<typeof schemaEmail>;
function PedirLink() {
  const [emailEnviado, setEmailEnviado] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormData>({
    resolver: zodResolver(schemaEmail),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: EmailFormData) => {
    try {
      const resposta = await fetch(`${apiUrl}/recuperar-senha/solicitar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!resposta.ok) {
        const dados = await resposta.json().catch(() => ({}));
        toast.error(mensagemDoBackend(dados, "Não foi possível enviar o link"));
        return;
      }

      // a resposta é a mesma exista o email ou não, e a tela também
      setEmailEnviado(data.email);
    } catch {
      toast.error("Falha ao conectar com o servidor");
    }
  };

  if (emailEnviado) {
    return (
      <div className="flex flex-col gap-4 pt-6" role="status">
        <p>
          Se <strong>{emailEnviado}</strong> estiver cadastrado, enviamos um
          link para redefinir a senha. Ele vale por 30 minutos
        </p>
        <p className="text-sm text-zinc-600">
          Não chegou? Olhe a caixa de spam ou tente de novo em alguns minutos
        </p>
        <button
          type="button"
          onClick={() => setEmailEnviado(null)}
          className="text-left hover:text-red-600 cursor-pointer"
        >
          Enviar para outro email
        </button>
        <Link href="/login" className="hover:text-red-600">
          Voltar para o login
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-2.5 pt-6"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Digite o email da sua conta"
          aria-invalid={errors.email ? true : undefined}
          {...register("email")}
          className="border border-zinc-400 hover:border-zinc-800 px-4 py-3 rounded-2xl"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col text-center">
        <ImagemBotao
          nomeImagem="login_icon.svg"
          texto={isSubmitting ? "Enviando..." : "Enviar link"}
          disabled={isSubmitting}
        />
        <Link href="/login" className="mt-2 hover:text-red-600">
          Voltar para o login
        </Link>
      </div>
    </form>
  );
}

// ---------- passo 2: escolher a nova senha (link do email) ----------

const schemaNovaSenha = z
  .object({
    senha: schemaSenhaForte,
    confirmarSenha: z.string().min(1, "Confirme a senha"),
  })
  .refine((dados) => dados.senha === dados.confirmarSenha, {
    message: "As senhas não são iguais",
    path: ["confirmarSenha"],
  });
type NovaSenhaFormData = z.infer<typeof schemaNovaSenha>;

function NovaSenha({ token }: { token: string }) {
  const router = useRouter();
  const [linkInvalido, setLinkInvalido] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<NovaSenhaFormData>({
    resolver: zodResolver(schemaNovaSenha),
    defaultValues: { senha: "", confirmarSenha: "" },
  });

  const senhaDigitada = watch("senha");

  const onSubmit = async (data: NovaSenhaFormData) => {
    try {
      const resposta = await fetch(`${apiUrl}/recuperar-senha/redefinir`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, senha: data.senha }),
      });
      const dados = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        // 400 sem lista de erros de validação = token inválido ou vencido
        if (resposta.status === 400 && typeof dados.message === "string") {
          setLinkInvalido(true);
        }
        toast.error(mensagemDoBackend(dados, "Erro ao atualizar a senha"));
        return;
      }

      toast.success("Senha alterada com sucesso!");
      router.push("/login");
    } catch {
      toast.error("Falha ao conectar com o servidor");
    }
  };

  if (linkInvalido) {
    return (
      <div className="flex flex-col gap-4 pt-6" role="alert">
        <p>Este link é inválido ou já expirou</p>
        <Link href="/esqueci-senha" className="text-red-600 hover:underline">
          Pedir um novo link
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-2.5 pt-6"
    >
      <InputSenha
        id="senha"
        rotulo="Nova senha"
        autoComplete="new-password"
        placeholder="Digite a nova senha"
        erro={errors.senha?.message}
        {...register("senha")}
      />
      <ChecklistSenha senha={senhaDigitada ?? ""} />

      <InputSenha
        id="confirmarSenha"
        rotulo="Confirmar senha"
        autoComplete="new-password"
        placeholder="Repita a nova senha"
        erro={errors.confirmarSenha?.message}
        {...register("confirmarSenha")}
      />

      <div className="flex flex-col text-center">
        <ImagemBotao
          nomeImagem="login_icon.svg"
          texto={isSubmitting ? "Alterando..." : "Alterar senha"}
          disabled={isSubmitting}
        />
        <Link href="/login" className="mt-2 hover:text-red-600">
          Voltar para o login
        </Link>
      </div>
    </form>
  );
}
