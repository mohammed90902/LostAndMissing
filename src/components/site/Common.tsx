import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { Info, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

export function PageHeader({
  title,
  intro,
  children,
  eyebrow,
}: {
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="border-b bg-card">
      <div className="container-app flex flex-col gap-4 py-8 md:flex-row md:items-end md:justify-between md:py-10">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="mb-2 font-bold uppercase tracking-wider text-primary text-sm">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl font-extrabold md:text-4xl">{title}</h1>
          {intro && <p className="mt-2 text-lg text-muted-foreground">{intro}</p>}
        </div>
        {children && <div className="flex flex-wrap gap-2">{children}</div>}
      </div>
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  children,
  action,
}: {
  icon: LucideIcon;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed bg-card px-6 py-14 text-center">
      <span className="grid size-16 place-items-center rounded-full bg-secondary text-primary">
        <Icon className="size-8" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-xl font-bold">{title}</h2>
      {children && <p className="mt-2 max-w-md text-muted-foreground">{children}</p>}
      {action && <div className="mt-6 flex flex-wrap justify-center gap-2">{action}</div>}
    </div>
  );
}

export function DemoNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 rounded-lg border border-warning/40 bg-warning-soft px-4 py-3 text-sm text-warning-foreground",
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

export function Section({
  title,
  action,
  children,
  className,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("container-app py-10", className)} aria-label={title}>
      <div className="mb-5 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-extrabold md:text-3xl">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  return (
    <div className="container-app max-w-3xl space-y-5 py-10 text-lg [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-extrabold [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2 [&_p_a]:text-primary [&_p_a]:underline [&_li_a]:text-primary [&_li_a]:underline">
      {translateNodes(children, t)}
    </div>
  );
}

function translateNodes(node: ReactNode, t: (text: string) => string): ReactNode {
  if (typeof node === "string") {
    const match = node.match(/^(\s*)([\s\S]*?)(\s*)$/);
    return match ? `${match[1]}${match[2] ? t(match[2]) : ""}${match[3]}` : node;
  }
  if (Array.isArray(node)) return Children.map(node, (child) => translateNodes(child, t));
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return cloneElement(node, {}, translateNodes(node.props.children, t));
  }
  return node;
}
