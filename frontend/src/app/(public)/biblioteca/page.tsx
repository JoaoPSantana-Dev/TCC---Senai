
import { EstruturaTotem } from "@/components/shared/EstruturaTotem";
import { Titulo } from "@/components/shared/TituloTotem";
import { BibliotecaStatus } from "./components/BibliotecaStatus";

export default function Biblioteca() {
  return (
    <EstruturaTotem mostrarNoticias={false}>
      <Titulo texto="Biblioteca da unidade">
        <section className="my-8 w-full p-8 shadow-md bg-[#f9f9f9] lg:w-1/2 lg:rounded-2xl">
          <div className="overflow-hidden rounded-2xl bg-white shadow-md">
            <img
              src="/biblioteca.jpg"
              alt="Biblioteca da unidade"
              className="h-auto w-full object-cover"
            />
          </div>
          <BibliotecaStatus />
        </section>
      </Titulo>
    </EstruturaTotem>
  );
}