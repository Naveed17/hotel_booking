import * as React from "react";

export default function createSvgIcon(
  path: React.ReactNode,
  displayName: string
) {
  const Component = React.forwardRef<
    SVGSVGElement,
    React.SVGProps<SVGSVGElement>
  >((props, ref) => (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      {path}
    </svg>
  ));

  Component.displayName = displayName;

  return React.memo(Component);
}
