import { AdComponent } from "../ads/AdComponent";

export function Ad({ slotId }: { slotId: string }) {
  return (
    <div className="my-10 w-full flex flex-col items-center">
      <div className="text-[10px] text-muted-foreground mb-1 uppercase tracking-widest">Publicidad</div>
      <AdComponent slotId={slotId} className="!my-0 w-full max-w-[728px]" />
    </div>
  );
}
