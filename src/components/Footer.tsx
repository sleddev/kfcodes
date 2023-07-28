import { Component } from "solid-js";

export const Footer: Component<{}> = (props) => {
  
  return (<>
    <div class="h-48 max-[600px]:h-36 relative overflow-hidden mt-auto flex-shrink-0">
    <img src="/assets/footer-left.png" class="h-full absolute object-contain object-left-bottom" />
    <img src="/assets/footer-right.png" class="h-full absolute right-0 object-contain object-right-bottom" />
    </div>
  </>);
};
