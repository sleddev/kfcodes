import { Accessor, Component, For } from "solid-js";
import { GridTile } from "./GridTile";

export const GridCard: Component<{donelist: Accessor<boolean[]>}> = (props) => {
  return <>
    <div class="w-[31rem] max-md:w-[100%] max-md:rounded-none max-md:border-x-0 mx-auto rounded-xl border-2 border-[#EBEBEB] bg-[#F7F7F7] p-3">
      <div class="flex justify-center gap-3 flex-wrap">
        <For each={props.donelist()}>
          {(done, i) => {
            return <GridTile done={done} i={i() + 1} />
          }}
        </For>
      </div>
    </div>
  </>;
};