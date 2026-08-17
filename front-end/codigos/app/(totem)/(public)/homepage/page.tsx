import { BlocoCentralComponent } from "@/app/components/totem/shared/bloco-central.component";
import FooterComponent from "@/app/components/totem/shared/footer.component";
import { HeaderComponent } from "@/app/components/totem/shared/header.component";

export default function Homepage() {
  return (
    <div className="w-screen h-screen flex flex-col gap-12">
      <HeaderComponent />

      <BlocoCentralComponent />

      <FooterComponent />
    </div>
  );
}
