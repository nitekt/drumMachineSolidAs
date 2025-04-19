import styles from '../App.module.css';
import { useStateContext } from '../App'


export default function Device(props) {
    const { state, setState } = useStateContext()
    return (
        
        <div class={styles.device_container}>
            <div class={styles.panel_container} style={{width: "65%", "padding-right": "7.5px"}}>
                
                <div class={styles.panel}>
                    <div class={styles.sound_editor} style={{width: "15%"}}>
                        <label for="engine-select">Engine:</label>
                        <select id="engine-select" name="engine-select">
                            <option value="sine">Sine</option>
                            <option value="square">Square</option>
                            <option value="sawtooth">Sawtooth</option>
                            <option value="triangle">Triangle</option>
                            <option value="noise">Noise</option>
                            <option value="sample">Sample</option>
                        </select>
                    </div>
                    <div class={styles.sound_editor} style={{width: "85%"}}>
                        <div style={{height: "55%"}}>waveform</div>
                        <div style={{height: "45%"}}>sample params</div>
                    </div>
                    {/* <input type="range" id={state.selected_track}></input>
                    <p>freq</p>
                    <p>Sample</p>
                    <input type="file"></input> */}
                </div>
            </div>
            <div class={styles.panel_container} style={{width: "35%", "padding-left": "7.5px"}}>
                <div class={styles.panel}>
                        <div style={{width: "calc(100%/3"}}>
                            <label for="fx-select">FX 1:</label>
                            <select id="fx-select" name="fx-select">
                                <option value="none">--</option>
                                <option value="FM">FM</option>
                                <option value="ring">Ring</option>
                                <option value="stretch">Stretch</option>
                                
                            </select>
                        </div>
                        <div style={{width: "calc(100%/3"}}>
                            <label for="fx-select">FX 2:</label>
                            <select id="fx-select" name="fx-select">
                                <option value="none">--</option>
                                <option value="FM">FM</option>
                                <option value="ring">Ring</option>
                                <option value="stretch">Stretch</option>
                                
                            </select>
                        </div>
                        <div style={{width: "calc(100%/3", display: "flex", "flex-direction": "column"}}>
                            <div style={{height: "50%"}}>oscilloscope</div> 
                            <div style={{height: "50%"}}>saturation</div>   
                        </div>
                </div>    
            </div>
            
            
            
           
        </div>
    );
}