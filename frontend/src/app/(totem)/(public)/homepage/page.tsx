import { HomepageComponent } from "@/app/components/totem/homepage/homepage.component";
import { EstruturaTotemComponent } from "@/app/components/totem/shared/estrutura-totem.component";

export default function Homepage() {
  return (
    <EstruturaTotemComponent>
      <HomepageComponent />
    </EstruturaTotemComponent>
  );
}
