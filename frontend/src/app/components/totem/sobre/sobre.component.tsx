import { ImagemComponent } from "../../shared/imagem.component";
import { TituloComponent } from "../shared/titulo.component";

export function SobreComponent() {
  return (
    <main className="w-full flex-1">
      <div className="mx-auto max-w-6xl w-full p-6 md:p-12 flex flex-col justify-center">
        {/* Título */}
        <TituloComponent texto="Sobre o SENAI Mariano Ferraz" />

        {/* Grid */}
        <section className="flex flex-col gap-6 w-full">
          {/* Linha 1 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch">
            <div className="flex items-center justify-center rounded-3xl bg-white p-8 text-zinc-700 shadow-sm min-h-80 transition-all duration-150 ease-in-out active:scale-[0.98] active:shadow-lg active:brightness-95 touch-manipulation select-none">
              <p className="text-center text-base md:text-lg font-medium leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                nemo ratione dignissimos explicabo hic facilis nisi consectetur
                minus, recusandae corrupti fugiat illum praesentium qui
                consequatur deleniti itaque quis laborum nesciunt veniam ipsam,
                possimus culpa ut! Officia rerum amet dolorum laborum.
              </p>
            </div>

            <div className="relative min-h-80 overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-150 ease-in-out active:scale-[0.98] active:shadow-lg active:brightness-95 touch-manipulation select-none">
              <ImagemComponent
                nomeImagem="senai-mariano-ferraz.png"
                alt="Senai Mariano-Ferraz"
                fill
              />
            </div>
          </div>

          {/* Linha 2 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch">
            <div className="relative min-h-80 overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-150 ease-in-out active:scale-[0.98] active:shadow-lg active:brightness-95 touch-manipulation select-none">
              <ImagemComponent
                nomeImagem="senai-mariano-ferraz.png"
                alt="Senai Mariano-Ferraz"
                fill
              />
            </div>

            <div className="flex items-center justify-center rounded-3xl bg-white p-8 text-zinc-700 shadow-sm min-h-80 transition-all duration-150 ease-in-out active:scale-[0.98] active:shadow-lg active:brightness-95 touch-manipulation select-none">
              <p className="text-center text-base md:text-lg font-medium leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                nemo ratione dignissimos explicabo hic facilis nisi consectetur
                minus, recusandae corrupti fugiat illum praesentium qui
                consequatur deleniti itaque quis laborum nesciunt veniam ipsam,
                possimus culpa ut! Officia rerum amet dolorum laborum.
              </p>
            </div>
          </div>

          {/* Linha 3 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch">
            <div className="flex items-center justify-center rounded-3xl bg-white p-8 text-zinc-700 shadow-sm min-h-80 transition-all duration-150 ease-in-out active:scale-[0.98] active:shadow-lg active:brightness-95 touch-manipulation select-none">
              <p className="text-center text-base md:text-lg font-medium leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
                nemo ratione dignissimos explicabo hic facilis nisi consectetur
                minus, recusandae corrupti fugiat illum praesentium qui
                consequatur deleniti itaque quis laborum nesciunt veniam ipsam,
                possimus culpa ut! Officia rerum amet dolorum laborum.
              </p>
            </div>

            <div className="relative min-h-80 overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-150 ease-in-out active:scale-[0.98] active:shadow-lg active:brightness-95 touch-manipulation select-none">
              <ImagemComponent
                nomeImagem="senai-mariano-ferraz.png"
                alt="Senai Mariano-Ferraz"
                fill
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
