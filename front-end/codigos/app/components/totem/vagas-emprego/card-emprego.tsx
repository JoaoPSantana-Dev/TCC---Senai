const vagas_empregos = [
    { 
        Nome_empresa : "SENAI",
        Cargo : "Professor",
        Requisitos : "Ensino Médio Completo",
        Salario : "R$ 3000,00",
        Benefiicios : "Microondas e água gelada",
        Descricao : "Trabalhará como professor de ADS",
        Localizacao : "Vila Leopoldina",
        Contato : "(11) 4002-8922",
        Area_emprego : "Educação" 
    }
]



export function CardEmprego(){
    return (
        <div className = "grid grid-cols-3 gap-4">
            {vagas_empregos.map((vaga) => (
            
                <div 
                    className = "w-80 bg-blue-200 items-center justify-center hover:border rounded-xl p-4"
                    >
                        <h2 className="text-xl text-center font-bold">
                            {vaga.Cargo} - {vaga.Nome_empresa} 
                        </h2>

                        <div className="text-justify">
                        <p>Descrição: {vaga.Descricao}</p>
                        <p>Requisitos: {vaga.Requisitos}</p>
                        <p>Salário: {vaga.Salario}</p>
                        <p>Benefícios: {vaga.Benefiicios}</p>
                        <p>Localização: {vaga.Localizacao}</p>
                        <p>Contato: {vaga.Contato}</p>
                        </div>

                    </div>
                 

            ))}
            
        </div>
    );
}
