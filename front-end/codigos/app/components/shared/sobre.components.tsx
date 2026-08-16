import ImagemComponent from "./imagem.component";

export default function SobreComponent(props: any) {
  return (
    <main className="min-h-screen w-full bg-[#EAEAEA] p-6 md:p-12 flex flex-col justify-between">
      <div className="mx-auto max-w-6xl w-full flex flex-col h-full justify-center">

        {/* Título */}
        <div className="mb-8 inline-block self-start rounded-3xl bg-white px-8 py-3 text-lg font-semibold text-zinc-800 shadow-sm">
          Titulo
        </div>

        {/* Grid */}
        <section className="flex flex-col gap-6 w-full">

          {/* Linha 1 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch">
            <div className="flex items-center justify-center rounded-3xl bg-white p-8 text-zinc-700 shadow-sm min-h-[320px]">
              <p className="text-center text-base md:text-lg font-medium leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam nemo ratione dignissimos explicabo hic facilis nisi consectetur minus, 
                recusandae corrupti fugiat illum praesentium qui consequatur deleniti itaque quis laborum nesciunt veniam ipsam, possimus culpa ut! 
                Officia rerum amet dolorum laborum.
              </p>
            </div>

            <div className="relative min-h-[320px] overflow-hidden rounded-3xl bg-white shadow-sm">
              <ImagemComponent nomeImagem="senai-mariano-ferraz.png" alt="Senai Mariano-Ferraz"/>
            </div>
          </div>

          {/* Linha 2 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch">
            <div className="relative min-h-[320px] overflow-hidden rounded-3xl bg-white shadow-sm">
              <ImagemComponent nomeImagem="senai-mariano-ferraz.png" alt="Senai Mariano-Ferraz"/>
            </div>

            <div className="flex items-center justify-center rounded-3xl bg-white p-8 text-zinc-700 shadow-sm min-h-[320px]">
              <p className="text-center text-base md:text-lg font-medium leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam nemo ratione dignissimos explicabo hic facilis nisi consectetur minus, 
                recusandae corrupti fugiat illum praesentium qui consequatur deleniti itaque quis laborum nesciunt veniam ipsam, possimus culpa ut! 
                Officia rerum amet dolorum laborum.
              </p>
            </div>
          </div>

          {/* Linha 3 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 items-stretch">
            <div className="flex items-center justify-center rounded-3xl bg-white p-8 text-zinc-700 shadow-sm min-h-[320px]">
              <p className="text-center text-base md:text-lg font-medium leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam nemo ratione dignissimos explicabo hic facilis nisi consectetur minus, 
                recusandae corrupti fugiat illum praesentium qui consequatur deleniti itaque quis laborum nesciunt veniam ipsam, possimus culpa ut! 
                Officia rerum amet dolorum laborum.
              </p>
            </div>

            <div className="relative min-h-[320px] overflow-hidden rounded-3xl bg-white shadow-sm">
              <ImagemComponent nomeImagem="senai-mariano-ferraz.png" alt="Senai Mariano-Ferraz"/>
            </div>
          </div>

        </section>
      </div>
    </main>
  );
}
