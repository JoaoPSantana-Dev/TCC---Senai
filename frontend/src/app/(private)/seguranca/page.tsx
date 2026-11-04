import { HeaderPrivate } from "@/components/shared/HeaderPrivate";
import { Seguranca2FA } from "./components/Seguranca2FA";

export default function Seguranca() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <HeaderPrivate />

      <main className="w-full max-w-2xl mx-auto px-6 pb-16 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-zinc-800">Segurança da conta</h1>
        <Seguranca2FA />
      </main>
    </div>
  );
}
