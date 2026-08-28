import { HomepageComponent } from "@/app/components/totem/homepage/homepage.component";
import FooterComponent from "@/app/components/shared/footer.component";
import { HeaderComponent } from "@/app/components/totem/shared/header.component";
import { NoticiasComponent } from "@/app/components/totem/shared/noticias.component";

export default function Homepage() {
  return (
    <main className="w-screen h-screen flex flex-col">
      <HeaderComponent />

      <HomepageComponent />

      <NoticiasComponent />

      <FooterComponent />
    </main>
  );
}
