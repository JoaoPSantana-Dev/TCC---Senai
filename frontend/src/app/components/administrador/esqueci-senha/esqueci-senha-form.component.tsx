"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { ImagemBotaoComponent } from "../../shared/imagem-botao.component";

const schemaEsqueciSenha = z.object({
  senha: z.string().min(8, "Sua nova senha precisa ter no mínimo 8 caracteres"),
});

type EsqueciSenhaFormData = z.infer<typeof schemaEsqueciSenha>;

export function EsqueciSenhaFormComponent() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EsqueciSenhaFormData>({
    resolver: zodResolver(schemaEsqueciSenha),
    defaultValues: {
      senha: "",
    },
  });

  const onSubmit = async (data: EsqueciSenhaFormData) => {
    try {
      const resposta = await fetch("http://localhost:3001/usuarios", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        toast.success("Senha alterada com sucesso!");
        router.push("/cadastro");
      } else {
        toast.error(dados.message || "Erro ao atualizar a senha");
      }
    } catch {
      toast.error("Falha ao conectar com o servidor");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2.5 pt-6"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="senha">Digite a nova senha</label>
        <input
          id="senha"
          type="password"
          {...register("senha")}
          className="border border-zinc-400 hover:border-zinc-800 px-4 py-3 rounded-2xl"
          placeholder="Digite a nova senha"
        />
        {errors.senha && (
          <p className="text-red-500 text-sm">{errors.senha.message}</p>
        )}
      </div>

      {/* aqui falta a div da segunda label para repetir a senha */}

      {/* precisa rever a funcionalidade pra organizar os ids dos inputs */}

      <div className="flex justify-center">
        <ImagemBotaoComponent
          nomeImagem="login_icon.svg"
          texto={isSubmitting ? "Alterando..." : "Alterar senha"}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}
