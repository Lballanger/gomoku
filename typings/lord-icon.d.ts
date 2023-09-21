declare namespace JSX {
  interface IntrinsicElements {
    "lord-icon": LordIconElement;
  }
}

type LordIconTrigger =
  | "hover"
  | "click"
  | "loop"
  | "loop-on-hover"
  | "morph"
  | "morph-two-way";

type LordIconProps = {
  src?: string;
  target?: string;
  trigger?: LordIconTrigger;
  colors?: string;
  delay?: string | number;
  class?: string;
};

type LordIconElement = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> &
  LordIconProps;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "lord-icon": LordIconElement;
    }
  }
}
