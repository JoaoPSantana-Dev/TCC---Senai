import { LinhaSobre } from "../totem/sobre/LinhaSobre";

const RegistrarComponente: Record<string.React.ComponentType<any>> = {
  LinhaSobre: LinhaSobre,
};

interface ComponentData {
  type: string;
  props: Record<string, any>;
}

export function RenderizadorDinamico({
  component,
}: {
  component: ComponentData;
}) {
  const RenderizarComponent = RegistrarComponente[component.type];

  if (!RenderizarComponent) {
    return (
      <div>
        <p>Componente {component.type} não registrado</p>
      </div>
    );
  }

  return <RenderizarComponent {...component.props} />;
}
