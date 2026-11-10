import { EstruturaTotem } from "@/components/shared/EstruturaTotem";
import { Titulo } from "@/components/shared/TituloTotem";

export default function HorariosAula() {
    
    return (
        <EstruturaTotem mostrarNoticias={false}>
            <Titulo texto="Horarios de Aulas">
                <div className="w-fit p-4 my-2 bg-[#f9f9f9] rounded-full lg:rounded-full shadow-md">
                    <h1 className={`text-center text-xl font-semibold my-2`}>
                        Escolha sua Turma
                    </h1>
                </div>
                <section className="w-full lg:w-2/4 p-8 my-8 bg-[#f9f9f9] lg:rounded-2xl shadow-md">
                    <div className="w-full p-6 min-h-50 bg-white rounded-2xl shadow-md">

                    </div>
                </section>
            </Titulo>
        </EstruturaTotem>
    )
}