"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Toaster } from "sonner";
import {
  Alert02Icon,
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";
import { registrarHostConfirmacao, type PedidoConfirmacao } from "@/lib/alerta";

function ModalConfirmacao() {
  const [pedido, setPedido] = useState<PedidoConfirmacao | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const idTitulo = useId();
  const idDescricao = useId();

  useEffect(() => registrarHostConfirmacao(setPedido), []);

  // abre/fecha o <dialog>
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (pedido && !dialog.open) dialog.showModal();
    if (!pedido && dialog.open) dialog.close();
  }, [pedido]);

  function responder(confirmou: boolean) {
    pedido?.resolver(confirmou);
    setPedido(null);
  }

  const alertaPerigo = pedido?.alertaPerigo ?? false;

  return (
    <dialog
      ref={dialogRef}
      role="alertdialog"
      aria-labelledby={idTitulo}
      aria-describedby={pedido?.descricao ? idDescricao : undefined}
      onCancel={(e) => {
        // apertar Esc
        e.preventDefault();
        responder(false);
      }}
      onClick={(e) => {
        // clique no fundo
        if (e.target === e.currentTarget) responder(false);
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-white p-0 text-black shadow-xl backdrop:bg-black/50"
    >
      {pedido && (
        <div className="flex flex-col gap-5 p-6">
          <div className="flex items-start gap-3">
            <span
              className={cn(
                "shrink-0 rounded-full p-2",
                alertaPerigo
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600",
              )}
            >
              <HugeiconsIcon
                icon={alertaPerigo ? Alert02Icon : InformationCircleIcon}
                size={24}
              />
            </span>

            <div className="flex flex-col gap-1">
              <h2 id={idTitulo} className="text-lg font-semibold">
                {pedido.titulo}
              </h2>
              {pedido.descricao && (
                <p id={idDescricao} className="text-sm text-zinc-600">
                  {pedido.descricao}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => responder(false)}
              className="cursor-pointer rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100"
            >
              {pedido.textoCancelar ?? "Cancelar"}
            </button>
            <button
              type="button"
              onClick={() => responder(true)}
              className={cn(
                "cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-white",
                alertaPerigo
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700",
              )}
            >
              {pedido.textoConfirmar ?? "Confirmar"}
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}

export function Alertas() {
  return (
    <>
      <Toaster
        position="top-right"
        icons={{
          success: <HugeiconsIcon icon={CheckmarkCircle02Icon} size={22} />,
          error: <HugeiconsIcon icon={AlertCircleIcon} size={22} />,
          warning: <HugeiconsIcon icon={Alert02Icon} size={22} />,
          info: <HugeiconsIcon icon={InformationCircleIcon} size={22} />,
        }}
        toastOptions={{
          unstyled: true,
          classNames: {
            toast:
              "flex items-center gap-3 w-[356px] rounded-xl border-2 bg-white px-4 py-3.5 shadow-lg text-black",
            title: "text-sm font-semibold",
            description: "text-sm text-zinc-600",
            success: "border-green-600 [&_[data-icon]]:text-green-600",
            error: "border-red-700 [&_[data-icon]]:text-red-700",
            warning: "border-yellow-500 [&_[data-icon]]:text-yellow-600",
            info: "border-blue-600 [&_[data-icon]]:text-blue-600",
          },
        }}
      />
      <ModalConfirmacao />
    </>
  );
}
