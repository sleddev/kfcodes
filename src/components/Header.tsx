import { Accessor, Component } from "solid-js";
import { Stripes } from "./Stripes";

export const Header: Component<{codes: Accessor<number[]>}> = (props) => {
  
  return <header class="bg-white">
    <div class="bg-[#E5002B] h-3 w-full" />
    <div class="flex items-center">
      <div class="md:ml-12 ml-6">
        <Stripes class="w-32 h-6" />
        <img src="/assets/kfc.png" class="w-32 h-[4.5rem]"></img>
      </div>
      <div class="md:mr-12 mr-6 ml-auto my-2 mb-4 h-12 border-2 border-[#DBDBDB] rounded-xl border-b-4 border-b-[#E5002B] w-28 flex items-center">
        <div class="text-[#E5002B] text-2xl font-bold text-center flex-1">{props.codes().length}</div>
        <div class="text-[#DBDBDB] text-2xl font-bold text-center w-2">/</div>
        <div class="text-[#DBDBDB] text-2xl font-bold text-center flex-1">99</div>
      </div>
    </div>
  </header>;
};
