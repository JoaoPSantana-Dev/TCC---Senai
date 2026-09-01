"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schemaCadastro = z.object({
  email: z.email("Endereço de email inválido"),
  password: z.string().min(8, "Senha precisa ter no mínimo 8 caracteres"),
});

type CadastroFormData = z.infer<typeof schemaCadastro>;

export function CadastroFormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CadastroFormData>({
    resolver: zodResolver(schemaCadastro),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: CadastroFormData) => {
    console.log("Cadastro enviado com sucesso:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register("email")} />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Senha</label>
        <input id="password" type="password" {...register("password")} />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
      </button>
    </form>
  );
}
