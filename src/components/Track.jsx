import { createStore } from 'solid-js/store'
import { useStateContext } from '../App'
import Sequencer from './Sequencer'

export default function Track(props) {
  const { state, setState } = useStateContext()
  const [control, setControl] = createStore({
    division: 2.0,
    length: 8,
  })

  return (
    <div class={props.class}>
      <div style={{ width: '20%' }}>
        volume
        <input
          type="range"
          min="-100"
          max="6"
          value="-20"
          step="1"
          class="track"
          id={props.id}
        ></input>
        <button
          onclick={() => {
            setState('selected_track', props.id)
            console.log(state.selected_track)
          }}
        >
          select track
        </button>
      </div>
      <div style={{ width: '70%' }}>
        <Sequencer id={props.id} seqInfo={control}></Sequencer>
      </div>
      <div style={{ width: '10%' }}>
        {() => {
          return (
            <div>
              <button
                onclick={() => {
                  setControl('division', control.division * 2.0)
                }}
              >
                /bpm
              </button>
              <button
                onclick={() => {
                  setControl('division', control.division / 2.0)
                }}
              >
                2bpm
              </button>
            </div>
          )
        }}
      </div>
    </div>
  )
}
