

class TimelineView extends HTMLElement
{
    constructor (patchConnection)
    {
        super();
        this.patchConnection = patchConnection;
        this.innerHTML = this.getHTML();

        this.framePos = "?";
        this.transport = "?";
        this.timeSig = "?";
        this.tempo = "?";
        this.quarterNote = "?";
        this.barQuarterNote = "?";

        this.patchConnection.addEndpointListener ("timeSigOut", value =>
        {
            this.timeSig = value.numerator + "/" + value.denominator;
            this.refreshDisplay();
        });

        this.patchConnection.addEndpointListener ("positionOut", value =>
        {
            this.framePos = value.frameIndex;
            this.quarterNote = value.quarterNote;
            this.barQuarterNote = value.barStartQuarterNote;
            this.refreshDisplay();
        });

        this.patchConnection.addEndpointListener ("transportStateOut", value =>
        {
            if (value.flags & 2)
                this.transport = "Recording";
            else if (value.flags & 1)
                this.transport = "Playing";
            else
                this.transport = "Stopped";

            this.transport += "   Looping: " + ((value.flags & 4) ? "on" : "off");
            this.refreshDisplay();
        });

        this.patchConnection.addEndpointListener ("tempoOut", value =>
        {
            this.tempo = value.bpm;
            this.refreshDisplay();
        });
    }

    refreshDisplay()
    {
        this.querySelector ("#status").innerText = `
Transport state:         ${this.transport}
Tempo:                   ${this.tempo} bpm
Time-signature:          ${this.timeSig}
Frame count:             ${this.framePos}
Quarter-note position:   ${this.quarterNote}
Bar start quarter-note:  ${this.barQuarterNote}`;
    }

    getHTML()
    {
        return `
        <style>
            .main {
                background: #345;
                display: block;
                width: 100%;
                height: 100%;
                padding: 1em;
                overflow: auto;
                color: #eee;
            }

            .main pre {
                font-size: 1.4em;
                font-family: Monaco, Consolas, monospace;
            }

        </style>

        <div class="main">
          <pre id="status"></pre>
        </div>`;
    }
}

export default function createPatchView (patchConnection)
{
    const customElementName = "timeline-patch-view";

    if (! window.customElements.get (customElementName))
        window.customElements.define (customElementName, TimelineView);

    return new (window.customElements.get (customElementName)) (patchConnection);
}
