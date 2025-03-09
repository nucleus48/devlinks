import { cn } from "@/lib/utils";

export type InputProps = React.ComponentProps<"input"> & {
  invalid?: boolean;
  renderIcon: () => React.ReactNode;
};

function Input({ className, type, renderIcon, invalid, ...props }: InputProps) {
  return (
    <div
      aria-invalid={invalid}
      className={cn(
        "border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex items-center gap-3 rounded-sm border bg-transparent px-4 py-3 transition-[color,box-shadow] caret-primary",
        "shadow-drop has-focus-visible:border-primary",
        "aria-invalid:border-destructive aria-invalid:text-destructive aria-invalid:shadow-none",
        className
      )}
    >
      <div className="shrink-0">{renderIcon()}</div>
      <input
        type={type}
        data-slot="input"
        className="placeholder:text-muted-foreground outline-none w-full"
        {...props}
      />
      {invalid && (
        <div className="shrink-0 text-xs font-normal text-destructive-foreground">
          Please check again
        </div>
      )}
    </div>
  );
}

export { Input };
