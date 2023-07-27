import { Accessor, Component, Setter, createSignal } from "solid-js";
import { serverURL } from "../config";

export const LoginCard: Component<{password: Accessor<string>, setPassword: Setter<string>, setLoggedIn: Setter<boolean>}> = (props) => {

  const [message, setMessage] = createSignal('IN ORDER TO ENTER, PROVE YOUR WORTH')

  async function handleSubmit(e: MouseEvent) {
    e.preventDefault()
    if (!props.password()) return;
    let res = await fetch(serverURL + '/password?password=' + props.password())
    if (res.status !== 200) {
      setMessage('PATHETIC. TRY AGAIN, MORTAL')
      props.setPassword('')
      return;
    }
    localStorage.setItem('password', props.password())
    props.setLoggedIn(true)
  }
  
  return <>
    <div class="w-[36rem] max-md:w-[100%] max-md:rounded-none max-md:border-x-0 mx-auto rounded-xl border-2 border-[#EBEBEB] bg-[#F7F7F7] p-3">
      <div class="flex">
        <div class="w-full rounded-lg h-14 font-semibold text-[#E5002B] bg-white inline-flex items-center justify-center">{message()}</div>
      </div>
      <form class="mt-3 p-4 w-full bg-white rounded-lg">
        <input value={props.password()} onInput={e => props.setPassword(e.target.value)} type="password" name="password" id="password" placeholder="ENTER THE PASSWORD..." class="block mx-auto mb-4 border-2 border-[#DBDBDB] rounded-lg h-12 w-[60%] focus:outline-none p-1 text-center placeholder:text-[#DBDBDB] text-[#444444] font-medium" />
        <button onClick={handleSubmit} type="submit" class="bg-[#8EA604] hover:bg-[#778B06] text-white rounded-full text-sm font-bold h-10 w-[60%] mx-auto block">LOG IN</button>
      </form>
    </div>
  </>;
};