import { createContext, For, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import styles from './App.module.css'
import Track from './components/Track'

const stateContext = createContext()
//make play state accessible to transport, tracks and devices
export function StateProvider(props) {
  //playing, tempo etc...
  const [state, setState] = createStore({
    playing: false,
    tempo: 120.0,
    selected_track: 1, //DISABLE THIS
    init: false,
  })
  return (
    <stateContext.Provider value={{ state, setState }}>
      {props.children}
    </stateContext.Provider>
  )
}
function resume() {
  window.context.resume()
}

export function useStateContext() {
  return useContext(stateContext)
}

function Transport() {
  const { state, setState } = useStateContext()

  return (
    <div class={styles.transport_bar}>
      Transport
      <button onclick={resume}>Start audio</button>
      <button
        onclick={() => {
          setState('playing', !state.playing)
        }}
      >
        {state.playing ? 'Stop' : 'Play'}
      </button>
    </div>
  )
}

function App() {
  return (
    <StateProvider>
      <div class={styles.App}>
        <div class={styles.drum_machine_container}>
          <Transport></Transport>
          <div class={styles.sequencer_container}>
            <For each={Array.from({ length: 6 }, (_, i) => i + 1)}>
              {(id) => (
                <Track class={styles.track} id={id} playState={state.playing} />
              )}
            </For>

            <div>master track</div>
          </div>
          <div class={styles.device_container}>device panel</div>
        </div>
      </div>
    </StateProvider>
  )
}

export default App
