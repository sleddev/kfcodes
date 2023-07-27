import { Accessor, Component, Setter, createEffect, createSignal, on } from "solid-js";
import { serverURL } from "../config";

export const InputCard: Component<{password: Accessor<string>, setPassword: Setter<string>, refetch: () => any, setLoggedIn: Setter<boolean>}> = (props) => {

  const [add, setAdd] = createSignal(true)
  const [code, setCode] = createSignal('', {equals: false})
  const [message, setMessage] = createSignal('ADD CODE')

  createEffect(on(add, v => setMessage(v ? 'ADD CODE' : 'REMOVE CODE')))

  function handeInput(e: InputEvent) {
    let v = (e.target as HTMLInputElement).value
    if (Number.isNaN(parseInt(e.data ?? '0')) || v.length > 2) {
      setCode(code())
      return;
    }
    setCode(v)
  }

  function validate(e: KeyboardEvent) {
    if (e.key === ".") {
      e.preventDefault()
    }
  }

  async function handleSubmit(e: MouseEvent) {
    e.preventDefault()
    if (!code()) return;
    let res = await fetch(serverURL + '/setcodes', {
      method: "POST",
      body: JSON.stringify({
        ...(add() ? {codes: code()} : {remove: code()}),
        password: props.password()
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.status === 401) {
      props.setPassword('')
      props.setLoggedIn(false)
      return;
    }
    if (res.status !== 200) {
      setMessage('FAILED :( TRY AGAIN')
      return;
    }
    setCode('')
    setMessage(add() ? 'CODE ADDED' : 'CODE REMOVED')
    props.refetch()
  }
  
  return <>
    <div class="w-[36rem] max-md:w-[100%] max-md:rounded-none max-md:border-x-0 mx-auto rounded-xl border-2 border-[#EBEBEB] bg-[#F7F7F7] p-3">
      <div class="flex">
        <button onClick={() => setAdd(true)} class="w-[50%] border-2 border-[#DBDBDB] rounded-lg h-14 text-sm font-semibold text-[#868686] inline-flex items-center justify-center   border-r-0 rounded-r-none" classList={{
          "text-[#E5002B] bg-white border-b-[5px] border-b-[#E9082B]": add()
        }}><span class="text-2xl font-normal mr-2">+</span> ADD CODE</button>
        <button onClick={() => setAdd(false)} class="w-[50%] border-2 border-[#DBDBDB] rounded-lg h-14 text-sm font-semibold text-[#868686] inline-flex items-center justify-center   border-l-0 rounded-l-none" classList={{
          "text-[#E5002B] bg-white border-b-[5px] border-b-[#E9082B]": !add()
        }}><span class="text-2xl font-normal mr-2">-</span> REMOVE CODE</button>
      </div>
      <form class="mt-3 p-4 w-full bg-white rounded-lg">
        <input value={code()} onInput={handeInput} onKeyDown={validate} type="number" min="1" max="99" name="code" id="code" placeholder="_ _" class="block mx-auto mb-4 border-2 border-[#DBDBDB] rounded-lg h-12 w-16 focus:outline-none p-1 text-2xl text-center placeholder:text-[#DBDBDB] text-[#444444] font-medium" />
        <button onClick={handleSubmit} type="submit" class="bg-[#8EA604] hover:bg-[#778B06] text-white rounded-full text-sm font-bold h-10 w-[60%] mx-auto block">{message()}</button>
      </form>
    </div>
  </>;
};