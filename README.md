## Available Scripts

In the project directory, you can run:

### `npm run dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. make sure to refer to the console which port it's hosted on as it may differ

The page will reload if you make edits. But it's best to referesh the page anyway<br>

## Getting Sound
Once the drum machine is live, press 'start audio' and enter some steps.

currently plays at 120bpm and has 6 tracks which play a sine synth at different pitches.

The codebase is a state but will fix it up in the weekends.

## Structure
`App.jsx` is the main file -> this defines the overall structure of the drum machine
I have a state provider in the `App.jsx` which serves various global properties of the sequence other components need to know.

`Track` is the track containing the volume panel, sequencer and sequence edits.
`Sequencer` is the actual step sequencer

## Building audio engine

`cd sdm/drumMachineSolidAs`

and then run `./cmaj generate --target=webaudio --output=./solidjs_sound/cmaj_SDM_engine.js SDM_engine.cmajorpatch`

This should re-build the web audio js classes for cmajor. make sure to refresh the page.

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)
