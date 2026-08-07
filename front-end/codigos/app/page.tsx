import { Login } from "./componentes/shared/login.componente";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 p-10 h-full w-full">
      <Login />
    </div>
  );
}
