import { Mapa as MapaTotem } from "@/app/(public)/mapa/Mapa";
import { EstruturaTotem } from "@/components/shared/EstruturaTotem";

export default function Mapa() {
  return (
    <EstruturaTotem mostrarNoticias={false}>
      <MapaTotem />
    </EstruturaTotem>
  );
}
