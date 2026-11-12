import { EstruturaTotem } from "@/components/shared/EstruturaTotem";
import { Titulo } from "@/components/shared/TituloTotem";
import Link from "next/link";
import { FiltroTurmas } from "./components/FiltroTurmas";

export default function HorariosAula() {
    return (
        <EstruturaTotem mostrarNoticias={false}>
            <Titulo texto="Horarios de Aulas">
                <FiltroTurmas/>
                <div className="w-50 p-4 my-2 bg-[#f9f9f9] rounded-full lg:rounded-full shadow-md flex items-center justify-center">
                <Link  href={"/mapa"}  className={`text-center text-xl font-semibold my-2`}> Olhar sala</Link>
                </div>
            </Titulo>
        </EstruturaTotem>
    )
}



