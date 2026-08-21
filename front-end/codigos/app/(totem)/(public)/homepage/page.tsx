import { HomepageComponent } from "@/app/components/totem/homepage/homepage.component";
import FooterComponent from "@/app/components/shared/footer.component";
import { HeaderComponent } from "@/app/components/totem/shared/header.component";

export default function Homepage() {
  return (
    <div className="w-screen h-screen flex flex-col gap-12">
      <HeaderComponent />

      <HomepageComponent />

      <FooterComponent />
    </div>
  );
}
