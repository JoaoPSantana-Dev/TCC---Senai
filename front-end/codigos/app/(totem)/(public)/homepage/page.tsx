import { HomepageComponent } from "@/app/components/totem/homepage/homepage.component";
import FooterComponent from "@/app/components/shared/footer.component";
import { HeaderComponent } from "@/app/components/totem/shared/header.component";
import { NoticiasComponent } from "@/app/components/totem/shared/noticias.component";

export default function Homepage() {
  return (
    <div className="w-screen h-screen flex flex-col gap-12">
      <main className="min-h-auto flex flex-col items-center justify-center">
        <HeaderComponent />

        <HomepageComponent />

        <NoticiasComponent />

        <FooterComponent />
      </main>
    </div>
  );
}
