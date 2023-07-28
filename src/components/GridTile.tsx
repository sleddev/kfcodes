import { Component } from "solid-js";

export const GridTile: Component<{done: boolean, i: number}> = (props) => {
  
  return (
    <div class="w-14 border-2 border-[#DBDBDB] rounded-lg h-14 text-lg font-semibold text-[#868686] inline-flex items-center justify-center" classList={{
    "text-[#E5002B] bg-white border-b-[5px] border-b-[#E9082B]": props.done
    }}>{props.i}</div>
  );
};
