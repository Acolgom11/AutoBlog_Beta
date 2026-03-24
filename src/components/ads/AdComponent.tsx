interface AdComponentProps {
  slotId: string;
  className?: string;
}

export function AdComponent({ slotId, className = "" }: AdComponentProps) {
  // In a production scenario, this component would output Google AdSense `<ins>` tags.
  // For now, it serves as a styled placeholder to guarantee layout integrity.
  return (
    <div className={`my-8 flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/30 p-4 text-center text-muted-foreground ${className}`}>
      <span className="text-xs uppercase tracking-wider opacity-50 mb-2 font-mono">Advertisement</span>
      <div className="flex h-[250px] w-full max-w-[300px] md:max-w-[728px] md:h-[90px] items-center justify-center rounded bg-muted/50 border border-dashed border-border/50">
        <span className="text-sm font-medium">Ad Space ({slotId})</span>
      </div>
    </div>
  );
}
