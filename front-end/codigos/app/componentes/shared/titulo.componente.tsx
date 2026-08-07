export function Titulo(props: any) {
    return (
        <div className="flex flex-col">
            <h1 className="text-lg font-bold">{props.principal}</h1>
            <h2 className="text-sm text-zinc-400">{props.segundario}</h2>
        </div>
    )
}