import { createEffect, createSignal, For, onCleanup } from 'solid-js'
import { createStore } from 'solid-js/store'
import { useStateContext } from '../App'
import styles from '../App.module.css'

export default function Sequencer(props) {
  const { state, setState } = useStateContext() //read these values but doesn't cause effect to re-ruun
  let parent
  let i = 0
  let interval
  let prevPlaying = false
  let runSeq
  let seqTimer

  //to make buttons show when they are toggled, use data(id of button) -> should index the right button in the array corresponding to the button's id

  const [intervalTime, setIntervalTime] = createSignal(
    60000.0 / (state.tempo * props.seqInfo.division)
  )
  var nextBeat = performance.now()
  //var stepIntervalTime = (60000.00 / (state.tempo * props.seqInfo.division));
  createEffect(() => {
    //listen to when seqinfo in track changes and update timing of sequencer accordingly
    // console.log("division changed");
    const { division } = props.seqInfo

    setIntervalTime(60000.0 / (state.tempo * division))
  })
  createEffect(() => {
    // per row sequencer
    if (!state) return

    const { playing } = state // Destructure the store values so that they are a part of the reactivity system

    let steps = parent.querySelectorAll('.step')

    if (playing) {
      runSeq = () => {
        let on = steps.item(i).getAttribute('isOn') == 'true' ? true : false

        if (on == true) {
          window.patch.sendEventOrValue('id_', props.id - 1)
          window.patch.sendEventOrValue('pressed', on)
          //if(props.id == 1 || props.id == 2) console.log(("i:" + i));
        }
        i = (i + 1) % 8
      }

      // var seqTimer_timeout = (setTimeout(() => {

      //     runSeq();
      // }, intervalTime()))

      // seqTimer_timeout;

      // seqTimer = (currentTime) => { //fires every beat
      //     if(!playing) cancelAnimationFrame(seqTimer);
      //     if(currentTime >= nextBeat) {

      //         runSeq();
      //         nextBeat += intervalTime();
      //         console.log(i);
      //     }

      //     requestAnimationFrame(seqTimer);
      // }

      // if(playing) requestAnimationFrame(seqTimer);

      //runSeq();
      runSeq()
      interval = setInterval(() => {
        // const customTimestamp = new Date().toLocaleString();
        // console.log("track: %d with time: %s", props.id, customTimestamp);

        runSeq()
      }, intervalTime()) //causing this effect to run when this changes
    } else {
      i = 0
      clearInterval(interval)
    }

    onCleanup(() => clearInterval(interval))
  })

  return (
    <div class={styles.sequencer} ref={parent}>
      <For each={Array.from({ length: 8 }, (_, i) => i + 1)}>
        {(step) => {
          const [step_, setStep_] = createStore({
            volume: 0.5,
            on: false, //remove this for setData()
          }) //createSignal(false);
          return (
            <div
              style={{
                width: '12.5%',
                'align-items': 'center',
                'justify-content': 'center',
                display: 'flex',
              }}
            >
              <button
                isOn={step_.on}
                onclick={() => setStep_('on', !step_.on)}
                classList={{ [styles.step]: true, step: true }}
                style={{
                  'background-color': step_.on
                    ? 'rgb(154 208 255)'
                    : 'var(--background-color)',
                }}
              ></button>
            </div> // fyi setData() in onclick for changing sequence data in the future
          )
        }}
      </For>
    </div> //class={styles.sequencer}
  )
}
