import { FC, PropsWithChildren } from "react";

export const Button: FC<React.HTMLProps<HTMLButtonElement>> = (
  props: PropsWithChildren
) => {
  return (
    <button
      className="bg-slate-300 text-slate-800 h-9 px-2 rounded-sm hover:bg-slate-400"
      {...props}
    >
      {props.children}
    </button>
  );
};
