import { Component, DEV, Show, createEffect, createResource, createSignal, on } from "solid-js";
import { Header } from "./components/Header";
import { serverURL } from "./config";
import { InputCard } from "./components/InputCard";
import { LoginCard } from "./components/LoginCard";
import { GridCard } from "./components/GridCard";

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

//TODO: footer?
//TODO: PWA

const App: Component<{}> = (props) => {
  const [password, setPassword] = createSignal(localStorage.getItem('password') ?? '')
  const [loggedIn, setLoggedIn] = createSignal(localStorage.getItem('password') !== null);
  const [data, { refetch }] = createResource(fetchCodes);
  const [codes, setCodes] = createSignal<number[]>(JSON.parse(localStorage.getItem('codes') ?? '[]'))
  const [donelist, setDonelist] = createSignal<boolean[]>(JSON.parse(localStorage.getItem('donelist') ?? '[]'))
  
  createEffect(on(data, (v) => {
    if ((v ?? []).length === 0) return; 
    setCodes(v ?? [])
    setDonelist(new Array(99).fill(0).map((_, i) => {
      console.log((v ?? []).includes(i + 1))
      return (v ?? []).includes(i + 1)
    }))
  }))
  createEffect(on(donelist, v => localStorage.setItem('donelist', JSON.stringify(v))))
  DEV && createEffect(() => console.log(codes()))

  return (<>
    <Header codes={codes} />
    <div class="h-12"></div>
    <Show when={loggedIn()} fallback={
      <LoginCard password={password} setPassword={setPassword} setLoggedIn={setLoggedIn} />
    }>
      <InputCard password={password} refetch={refetch} setLoggedIn={setLoggedIn} setPassword={setPassword}/>
      <div class="h-12"></div>
      <GridCard donelist={donelist}/>
      <div class="h-48"></div>
    </Show>
  </>);
};

export default App;
