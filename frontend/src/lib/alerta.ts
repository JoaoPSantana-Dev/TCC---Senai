import { toast } from "sonner";

export interface OpcoesConfirmacao {
  titulo: string;
  descricao?: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  alertaPerigo?: boolean;
}

export interface PedidoConfirmacao extends OpcoesConfirmacao {
  resolver: (confirmou: boolean) => void;
}

// o <Alertas /> se registra aqui para mostrar o modal
let host: ((pedido: PedidoConfirmacao | null) => void) | null = null;
let pedidoAtual: PedidoConfirmacao | null = null;

export function registrarHostConfirmacao(
  funcao: (pedido: PedidoConfirmacao | null) => void,
) {
  host = funcao;
  return () => {
    host = null;
  };
}

function confirmar(opcoes: OpcoesConfirmacao): Promise<boolean> {
  return new Promise((resolve) => {
    // sem o host montado, puxa o confirm padrão
    if (!host) {
      resolve(
        window.confirm(
          opcoes.descricao
            ? `${opcoes.titulo}\n\n${opcoes.descricao}`
            : opcoes.titulo,
        ),
      );
      return;
    }

    // se já tem um modal aberto, cancela o anterior
    pedidoAtual?.resolver(false);

    pedidoAtual = {
      ...opcoes,
      resolver: (confirmou) => {
        pedidoAtual = null;
        resolve(confirmou);
      },
    };
    host(pedidoAtual);
  });
}

// o id evitar mostrar o mesmo aviso se o usuário clicar várias vezes
export const alerta = {
  sucesso: (mensagem: string, descricao?: string) =>
    toast.success(mensagem, { id: mensagem, description: descricao }),
  erro: (mensagem: string, descricao?: string) =>
    toast.error(mensagem, { id: mensagem, description: descricao }),
  aviso: (mensagem: string, descricao?: string) =>
    toast.warning(mensagem, { id: mensagem, description: descricao }),
  info: (mensagem: string, descricao?: string) =>
    toast.info(mensagem, { id: mensagem, description: descricao }),
  confirmar,
};
