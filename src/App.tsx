import { Component, DEV, Show, createEffect, createResource, createSignal, on } from "solid-js";
import { Header } from "./components/Header";
import { serverURL } from "./config";
import { InputCard } from "./components/InputCard";
import { LoginCard } from "./components/LoginCard";

async function fetchCodes() {
  let res = await fetch(serverURL + '/codes')
  try {
    let data = (await res.json()) as number[] ?? []
    if (data.length > 0) {
      localStorage.setItem('codes', JSON.stringify(data))
    }
    return data;
  } catch {
    return []
  }
}

//TODO: server side backups
//TODO: grid card
//TODO: footer?
//TODO: PWA

const App: Component<{}> = (props) => {
  const [password, setPassword] = createSignal(localStorage.getItem('password') ?? '')
  const [loggedIn, setLoggedIn] = createSignal(localStorage.getItem('password'));
  const [data, { refetch }] = createResource(fetchCodes);
  const [codes, setCodes] = createSignal<number[]>(JSON.parse(localStorage.getItem('codes') ?? '[]'))
  
  createEffect(on(data, (v) => {
    if ((v ?? []).length > 0) setCodes(v ?? [])
  }))
  DEV && createEffect(() => console.log(codes()))

  return (<>
    <Header codes={codes} />
    <div class="h-12"></div>
    <Show when={loggedIn()} fallback={
      <LoginCard password={password} setPassword={setPassword} setLoggedIn={setLoggedIn} />
    }>
      <InputCard password={password} refetch={refetch} setLoggedIn={setLoggedIn} setPassword={setPassword}/>
    </Show>
  </>);
};

export default App;
