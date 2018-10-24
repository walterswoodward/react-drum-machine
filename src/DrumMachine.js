import "./index.css";
import React, { Component } from "react";
import agogo from "./sounds/HR16Agogo-24b.wav";
import block from "./sounds/HR16Block1-24b.wav";
import kick from "./sounds/HR16Kick01-24b.wav";
import triangle from "./sounds/HR16Triangle-24b.wav";
import snare from "./sounds/HR16Snare01-24b.wav";
import tom from "./sounds/HR16Tom01-24b.wav";
import crash from "./sounds/HR16Crash-24b.wav";
import cabasa from "./sounds/HR16Cabasa-24b.wav";
import timbale from "./sounds/HR16Timbale-24b.wav";

const sounds = [
  { pid: "agogo", letter: "Q", src: agogo },
  { pid: "block", letter: "W", src: block },
  { pid: "kick", letter: "E", src: kick },
  { pid: "triangle", letter: "A", src: triangle },
  { pid: "snare", letter: "S", src: snare },
  { pid: "tom", letter: "D", src: tom },
  { pid: "crash", letter: "Z", src: crash },
  { pid: "cabasa", letter: "X", src: cabasa },
  { pid: "timbale", letter: "C", src: timbale }
];

class DrumPad extends Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.keyChange = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);

    // console.log(document.getElementById(this.props.letter))
    // document.getElementById(this.props.letter).style.color = "green"
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);

  }

  handleKeyDown = e => {
    if (e.keyCode === this.props.letter.charCodeAt()) {
      this.audio.currentTime = 0;
      this.audio.play();
      this.props.handleDisplay(this.props.pid.toUpperCase());
      // React.createRef
      this.keyChange.current.style.background = "yellow" // https://reactjs.org/docs/refs-and-the-dom.html
    }
  };

  handleKeyUp = e => {
    this.keyChange.current.style.background = "orange"

  }

  handleClick = () => {
    // Helps with delay
    this.audio.currentTime = 0;
    this.audio.play();
    
  };
  render() {
    return (
      <div className="drum-pad" onClick={this.handleClick} ref={this.keyChange} >
        <p className="drum-pad-text">{this.props.letter}</p>
        <audio
          ref={ref => (this.audio = ref)}
          src={this.props.src}
          id={this.props.letter}
          className="clip"
        />
      </div>
    );
  }
}

class DrumMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: ""
    };
    this.handleDisplay = this.handleDisplay.bind(this);
  }
  handleDisplay(text) {
    this.setState({ display: text });
  }

  render() {
    return (
      <div id="drum-machine">
        <div id="display">{this.state.display}</div>
        <div id="drum-pads">
          {sounds.map(sound => (
            <DrumPad
              key={sound.pid}
              pid={sound.pid}
              letter={sound.letter}
              src={sound.src}
              handleDisplay={this.handleDisplay}
            />
          ))}
        </div>
        <div id="power-switch">
        <div id="power-switch-knob">OFF</div>
        </div>
      </div>
    );
  }
}

export default DrumMachine;
