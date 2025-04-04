"use client"




export function EmptySpace({
    children,
    resizable = false,
    padding = true,
    className,
  }: React.PropsWithChildren<{
    resizable?: boolean;
    padding?: boolean;
    className?: string;
  }>) {
    return (
        <>
            <div className={className || "rounded-lg bg-transparent p-4 dark:bg-transparent "}></div>
        </>
    )
}
