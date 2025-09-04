import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import cn from "@src/utils/classNames";

// lucide icons
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 flex items-start gap-2",
  {
    variants: {
      variant: {
        default:
          "bg-background text-foreground border border-gray-300 [&>svg]:text-foreground",
        destructive:
          "bg-red-50 border-red-500 text-red-600 dark:bg-red-900/20 dark:border-red-700 dark:text-red-400 [&>svg]:text-red-600 dark:[&>svg]:text-red-400",
        success:
          "bg-green-50 border-green-500 text-green-700 dark:bg-green-900/20 dark:border-green-700 dark:text-green-400 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
        warning:
          "bg-yellow-50 border-yellow-500 text-yellow-700 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-400 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400",
        info:
          "bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-400 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const icons: Record<string, React.ReactNode> = {
  default: <Info className="h-5 w-5 shrink-0 mt-0.5" />,
  destructive: <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />,
  success: <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />,
  warning: <TriangleAlert className="h-5 w-5 shrink-0 mt-0.5" />,
  info: <Info className="h-5 w-5 shrink-0 mt-0.5" />,
};

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant = "default", children, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  >
    {icons[variant as string] || icons.default}
    <div className="flex flex-col">{children}</div>
  </div>
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
