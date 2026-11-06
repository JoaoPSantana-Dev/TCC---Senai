"use client";

import { InputSenha } from "@/components/shared/InputSenha";
import { mensagemDoBackend } from "@/lib/autenticacao";
import { QRCodeSVG } from "qrcode.react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type Status = { ativo: boolean; codigosRecuperacaoRestantes: number };
type Configuracao = { segredo: string; uri: string };

async function chamar(acao: string, corpo?: unknown) {
  const resposta = await fetch(`/api/2fa/${acao}`, {
    method: acao === "status" ? "GET" : "POST",
    headers: { "Content-Type": "application/json" },
    body: acao === "status" ? undefined : JSON.stringify(corpo ?? {}),
  });
  const dados = await resposta.json().catch(() => ({}));
  return { ok: resposta.ok, dados };
}

function baixarCodigos(codigos: string[]) {
  const blob = new Blob(
    [
      `Codigos de recuperacação - Totem SENAI\nCada código funciona uma única vez \n\n ${codigos.join("\n")}\n`,
    ],
    { type: "text/plain" },
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "codigos-recuperacao.tsx";
  link.click();
  URL.revokeObjectURL(url);
}

const classeCampo =
  "border border-zinc-400 hover:border-zinc-800 px-4 py-3 rounded-2xl";
const classeBotao =
  "rounded-3xl px-5 py-2 text-white duration-150 cursor-pointer disabled:opacity-60";

export function Seguranca2FA() {
  const [status, setStatus] = useState<Status | null>(null);
  const [configuracao, setConfiguracao] = useState<Configuracao | null>(null);
  const [codigosNovos, setCodigosNovos] = useState<string[] | null>(null);
  const [codigo, setCodigo] = useState("");
  const [senha, setSenha] = useState("");
  const [ocupado, setOcupado] = useState(false);

  const carregarStatus = useCallback(async () => {
    const { ok, dados } = await chamar("status");
    if (ok) setStatus(dados as Status);
    else
      toast.error(
        mensagemDoBackend(dados, "Não foi possível carregar o status"),
      );
  }, []);

  useEffect(() => {
    carregarStatus();
  }, [carregarStatus]);

  async function iniciar() {
    setOcupado(true);
    const { ok, dados } = await chamar("configurar");
    setOcupado(false);

    if (!ok) {
      toast.error(
        mensagemDoBackend(dados, "Não foi possível iniciar a configuração"),
      );
      return;
    }
    setConfiguracao(dados as Configuracao);
  }

  async function confirmar() {
    setOcupado(true);
    const { ok, dados } = await chamar("ativar", { codigo });
    setOcupado(false);

    if (!ok) {
      toast.error(mensagemDoBackend(dados, "Código inválido"));
      return;
    }

    toast.success("Verificação em duas etapas ativada!");
    setCodigosNovos(
      (dados as { codigosRecuperacao: string[] }).codigosRecuperacao,
    );
    setConfiguracao(null);
    setCodigo("");
    carregarStatus();
  }

  async function desativar() {
    setOcupado(true);
    const { ok, dados } = await chamar("desativar", { senha, codigo });
    setOcupado(false);

    if (!ok) {
      toast.error(mensagemDoBackend(dados, "Não foi possível desativar"));
      return;
    }

    toast.success("Verificação em duas etapas desativada");
    setSenha("");
    setCodigo("");
    carregarStatus();
  }

  if (!status) return <p className="text-zinc-600">Carregando...</p>;

  // logo depois de ativar, mostra os códigos de recuperação que só aparecem agora
  if (codigosNovos) {
    return (
      <section className="flex flex-col gap-4 rounded-2xl border-2 border-yellow-500 p-6">
        <h2 className="text-lg font-semibold">
          Guarde seus códigos de recuperação
        </h2>
        <p className="text-sm text-zinc-700">
          Se você perder o celular, cada código abaixo entra no lugar do código
          do aplicativo, uma única vez. Eles não serão mostrados de novo, então
          salve-os em algum lugar
        </p>

        <ul className="grid grid-cols-2 gap-2 font-mono text-lg">
          {codigosNovos.map((item) => (
            <li
              key={item}
              className="rounded-md bg-zinc-100 px-3 py-1 text-center"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(codigosNovos.join("\n"));
              toast.success("Códigos copiados");
            }}
            className="rounded-3xl border border-zinc-400 px-5 py-2 hover:bg-zinc-100 cursor-pointer"
          >
            Copiar
          </button>
          <button
            type="button"
            onClick={() => baixarCodigos(codigosNovos)}
            className="rounded-3xl border border-zinc-400 px-5 py-2 hover:bg-zinc-100 cursor-pointer"
          >
            Baixar .txt
          </button>
          <button
            type="button"
            onClick={() => setCodigosNovos(null)}
            className={`${classeBotao} bg-red-600 hover:bg-red-700`}
          >
            Já guardei meus códigos
          </button>
        </div>
      </section>
    );
  }

  if (status.ativo) {
    return (
      <section className="flex flex-col gap-4 rounded-2xl border-2 border-zinc-100 p-6">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">Verificação em duas etapas</h2>
          <span className="rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
            Ativa
          </span>
        </div>

        <p className="text-sm text-zinc-700">
          Códigos de recuperação restantes: {status.codigosRecuperacaoRestantes}
        </p>

        <div className="flex flex-col gap-3 border-t border-zinc-200 pt-4">
          <h3 className="font-medium">Desativar</h3>
          <p className="text-sm text-zinc-600">
            Confirme com a senha e com um código do aplicativo (ou de
            recuperação)
          </p>

          <InputSenha
            id="senha-desativar"
            rotulo="Senha"
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="codigo-desativar">Código</label>
            <input
              id="codigo-desativar"
              type="text"
              autoComplete="one-time-code"
              maxLength={11}
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className={classeCampo}
            />
          </div>

          <button
            type="button"
            onClick={desativar}
            disabled={ocupado || !senha || !codigo}
            className={`${classeBotao} bg-red-600 hover:bg-red-700 self-start`}
          >
            {ocupado
              ? "Desativando..."
              : "Desativar verificação em duas etapas"}
          </button>
        </div>
      </section>
    );
  }

  if (configuracao) {
    return (
      <section className="flex flex-col gap-4 rounded-2xl border-2 border-zinc-200 p-6">
        <h2 className="text-lg font-semibold">
          Ativar verificação em duas etapas
        </h2>

        <ol className="flex list-decimal flex-col gap-1 pl-5 text-sm text-zinc-700">
          <li>
            Abra um aplicativo autenticador (Google Authenticator, Microsoft
            Authenticator, Authy...)
          </li>
          <li>Escaneie o QR code abaixo ou digite a chave manualmente</li>
          <li>Digite o código de 6 dígitos que o aplicativo mostrar</li>
        </ol>

        <div className="flex flex-col items-center gap-3">
          <div className="rounded-xl bg-white p-3 border border-zinc-200">
            <QRCodeSVG value={configuracao.uri} size={192} level="M" />
          </div>
          <p className="text-xs text-zinc-600">
            Ou digite essa chave no aplicativo:
          </p>
          <code className="rounded-md bg-zinc-100 px-3 py-1 text-sm tracking-wider break-all">
            {configuracao.segredo}
          </code>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="codigo-ativar">Código do aplicativo</label>
          <input
            id="codigo-ativar"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={codigo}
            onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ""))}
            className={`${classeCampo} tracking-widest text-center text-xl`}
            placeholder="000000"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={confirmar}
            disabled={ocupado || codigo.length !== 6}
            className={`${classeBotao} bg-red-600 hover:bg-red-700`}
          >
            {ocupado ? "Confirmando..." : "Confirmar e ativar"}
          </button>
          <button
            type="button"
            onClick={() => {
              setConfiguracao(null);
              setCodigo("");
            }}
            className="rounded-3xl border border-zinc-400 px-5 py-2 hover:bg-zinc-100 cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-4 rounded-2xl border-2 border-zinc-200 p-6">
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold">Verificação em duas etapas</h2>
        <span className="rounded-full bg-zinc-100 px-3 py-0.5 text-sm font-medium text-zinc-700">
          Desativada
        </span>
      </div>

      <p className="text-sm text-zinc-700">
        Além da senha, o login passa a pedir um código do seu aplicativo
        autenticador. Mesmo que alguém descubra sua senha, não consegue entrar
        sem o seu celular
      </p>

      <button
        type="button"
        onClick={iniciar}
        disabled={ocupado}
        className={`${classeBotao} bg-red-600 hover:bg-red-700 self-start`}
      >
        {ocupado ? "Preparando..." : "Ativar verificação em duas etapas"}
      </button>
    </section>
  );
}
