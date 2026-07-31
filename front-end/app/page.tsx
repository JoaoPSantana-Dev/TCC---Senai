import { Titulo } from "./componentes/shared/titulo.componente";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 p-10">

      <Titulo principal="Tela inicial" segundario="oi" />
    
    </div>
  );
}