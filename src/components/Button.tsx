import { FC, PropsWithChildren } from "react";

export const Button: FC<React.HTMLProps<HTMLButtonElement>> = (
  props: PropsWithChildren
) => {
  return (
    <button
      className="disabled:bg-slate-500 disabled:cursor-not-allowed disabled:text-black/20 bg-slate-300 text-slate-800 h-9 px-2 rounded-sm hover:bg-slate-400"
      {...props}
    >
      {props.children}
    </button>
  );
};
