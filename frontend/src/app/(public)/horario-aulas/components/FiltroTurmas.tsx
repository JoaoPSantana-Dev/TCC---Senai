let textoPadraoBotao = "Escolha sua Turma"
let textoPadrao = "selecione uma turma"

const curso=["TDS","MEKA"]

export function FiltroTurmas() {
    return (
        <section>
            <div className="w-fit p-4 my-2 bg-[#f9f9f9] rounded-full lg:rounded-full shadow-md">
                <button id="filter" type="button" onClick={()=>{}} className={`text-center text-xl font-semibold my-2`}>
                    {textoPadraoBotao}
                </button>
            </div>
            <div className="w-full lg:w-2/4 p-8 my-8 bg-[#f9f9f9] lg:rounded-2xl shadow-md">
                <div id="exibição" className="w-full flex p-6 min-h-50 bg-white rounded-2xl shadow-md items-center justify-center">
                    <div></div>
                </div>
            </div>
        </section>
    )
}