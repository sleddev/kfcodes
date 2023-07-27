import { Component } from "solid-js";

export const Stripes: Component<{class?: string}> = (props) => {
  
  return <div class={props.class + " flex"}>
    <div class="h-full flex-1 bg-[#E5002B]"></div>
    <div class="h-full flex-1 bg-white"></div>
    <div class="h-full flex-1 bg-[#E5002B]"></div>
    <div class="h-full flex-1 bg-white"></div>
    <div class="h-full flex-1 bg-[#E5002B]"></div>
  </div>;
};