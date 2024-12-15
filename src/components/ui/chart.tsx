import * as React from "react";
import { ChartTooltipProps } from "recharts";

import { cn } from "@/lib/utils";

export interface ChartContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  config: Record<string, any>;
}

export const ChartContainer = React.forwardRef<
  HTMLDivElement,
  ChartContainerProps
>(({ className, config, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("h-[350px] w-full", className)}
    style={
      {
        "--color-temperature": "var(--chart-1)",
        "--color-humidity": "var(--chart-2)",
        "--color-wind": "var(--chart-3)",
        "--color-precipitation": "var(--chart-4)",
        ...Object.entries(config).reduce((acc, [key, value]) => {
          acc[`--color-${key}`] = `var(--${value.color})`;
          return acc;
        }, {} as Record<string, string>),
      } as React.CSSProperties
    }
    {...props}
  />
));
ChartContainer.displayName = "ChartContainer";

export const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  ChartTooltipProps<any, any>
>(({ active, payload, label, ...props }, ref) => {
  if (!active || !payload) {
    return null;
  }

  return (
    <div
      ref={ref}
      className="rounded-lg border bg-background p-2 shadow-sm"
      {...props}
    >
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">
            {label}
          </span>
        </div>
        {payload.map((item: any) => (
          <div key={item.name} className="flex flex-col">
            <span
              className="text-[0.70rem] font-bold"
              style={{ color: item.color }}
            >
              {item.value}
            </span>
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});
ChartTooltip.displayName = "ChartTooltip";

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  ChartTooltipProps<any, any>
>(({ active, payload, label, ...props }, ref) => {
  if (!active || !payload) {
    return null;
  }

  return (
    <div
      ref={ref}
      className="rounded-lg border bg-background p-2 shadow-sm"
      {...props}
    >
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">
            {label}
          </span>
        </div>
        {payload.map((item: any) => (
          <div key={item.name} className="flex flex-col">
            <span
              className="text-[0.70rem] font-bold"
              style={{ color: `var(--color-${item.name.toLowerCase()})` }}
            >
              {item.value}
            </span>
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});
ChartTooltipContent.displayName = "ChartTooltipContent";
