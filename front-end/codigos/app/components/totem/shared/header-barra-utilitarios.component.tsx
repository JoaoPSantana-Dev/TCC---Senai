export function HeaderBarraUtilitarios() {
  return (
    <div className="flex w-full bg-red-600 gap-2 items-center justify-between pl-2 pr-2">
      <p className="font-semibold text-sm uppercase truncate">
        FIESP CIESP SESI SENAI IRS | F | TW | YT | iN | iNt | wz
      </p>

      <time className="font-semibold text-sm uppercase truncate shrink-0 flex items-center justify-center gap-2">
        <span>16:00:00</span>
        <span>21°</span>
      </time>
    </div>
  );
}
