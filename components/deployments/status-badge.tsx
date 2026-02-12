import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusConfig: Record<
  string,
  { label: string; dotColor: string; badgeClass: string }
> = {
  READY: {
    label: "Ready",
    dotColor: "bg-emerald-500",
    badgeClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  },
  BUILDING: {
    label: "Building",
    dotColor: "bg-amber-500",
    badgeClass: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  },
  QUEUED: {
    label: "Queued",
    dotColor: "bg-blue-500",
    badgeClass: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  },
  INITIALIZING: {
    label: "Initializing",
    dotColor: "bg-blue-500",
    badgeClass: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  },
  ERROR: {
    label: "Error",
    dotColor: "bg-red-500",
    badgeClass: "bg-red-500/15 text-red-700 dark:text-red-400",
  },
  CANCELED: {
    label: "Canceled",
    dotColor: "bg-muted-foreground",
    badgeClass: "bg-muted text-muted-foreground",
  },
  DELETED: {
    label: "Deleted",
    dotColor: "bg-muted-foreground",
    badgeClass: "bg-muted text-muted-foreground",
  },
};

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] ?? {
    label: status,
    dotColor: "bg-muted-foreground",
    badgeClass: "bg-muted text-muted-foreground",
  };

  return (
    <Badge variant="outline" className={cn("border-transparent", config.badgeClass)}>
      <span className={cn("inline-block h-1.5 w-1.5 rounded-full", config.dotColor)} />
      {config.label}
    </Badge>
  );
}
