export function Login() {
  return (
    <div className="flex flex-row gap-15 h-full">
      <div className="w-full md:w-1/2 h-full px-20 py-20 space-y-4 bg-black flex flex-col content-end grow-6">
        <img
          src="../shared/senai-mariano-ferraz.png"
          alt="Imagem da escola SENAI Mariano Ferraz"
        />
      </div>

      <div className="w-full md:w-1/2 h-full px-20 py-20 gap-4 bg-white flex flex-col content-end items-center justify-center grow-4">
        <h1 className="font-semibold text-red-500 text-2xl">Login</h1>
        <input
          type="text"
          placeholder="___.___.___-__"
          className="w-1/2 px-4 py-2 border"
        />

        <input
          type="text"
          placeholder="Digite sua senha"
          className="w-1/2 px-4 py-2 border"
        />
      </div>
    </div>
  );
}
