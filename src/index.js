import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];


const onBox = { background: "rgb(8, 129, 8)" }
const offBox = { background: "rgb(141, 27, 27)" }

const onStyle = {
  float: "right",
  backgroundColor: "rgb(12, 206, 12)"
}
const offStyle = {
  float: 'left',
  backgroundColor: "rgb(190, 36, 36)"
}


class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
    this.playSound = this.playSound.bind(this);
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  
  handleClick() {
    this.playSound();
    this.changeDisplay(this.props.id);

    var linkToFocus = document.getElementById(this.props.id);
    linkToFocus.focus();
    setTimeout(function(){ linkToFocus.blur(); }, 100);
  }
  
  handleKeyPress(event) {
    if (event.keyCode === this.props.keyCode) {
      this.playSound();
      this.changeDisplay(this.props.id);
      
      var linkToFocus = document.getElementById(this.props.id);
      linkToFocus.focus();
      setTimeout(function(){ linkToFocus.blur(); }, 100);
    }
  }
  
  changeDisplay(value) { this.props.displayCallback(value); }
  
  playSound() {
    const sound = document.getElementById(this.props.keyChar);
    sound.currentTime = 0;
    sound.play();
  }
 
  render() {
    return(
      <button className="drum-pad" id={this.props.id} onClick={this.handleClick} onKeyDown={this.handleKeyPress}>
        {this.props.keyChar}
        <audio className='clip' id={this.props.keyChar} src={this.props.url}></audio>
      </button>
    )
  }
};

class DrumMachine extends React.Component {
  constructor(props){
    super(props)
      this.state = {
        display: '',
        currentBank: bankOne,
        power: true,
        powerStyle: onStyle,
        bankStyle: {float: "right"},
        boxStyle: onBox,
        bankName: "1"
      }
      this.handleDisplay = this.handleDisplay.bind(this);
      this.turnPower = this.turnPower.bind(this);
      this.changeBank = this.changeBank.bind(this);
    }
    
    handleDisplay(childData) {
      this.setState({display: childData})
    }

    turnPower(){
      if(this.state.power === true){
        this.setState({
          power: false,
          powerStyle: offStyle,
          boxStyle: offBox,
          display: ''
        })
      } else {
        this.setState({
          power: true,
          powerStyle: onStyle,
          boxStyle: onBox,
          currentBank: bankOne
        })
      }
    }

    changeBank() {
      if(this.state.currentBank === bankOne){
        this.setState({
          currentBank: bankTwo,
          bankStyle: {float: "left"},
          bankName: "2"
        })
      } else {
        this.setState({
          currentBank: bankOne,
          bankStyle: {float: "right"},
          bankName: "1"
        })
      }
    }
    render() {
      let drumPadsDisplayed = this.state.currentBank.map((drumObj, i, drumPadsArr) => {
        if(this.state.power){
          return (
            <DrumPad keyCode={drumPadsArr[i].keyCode} keyChar={drumPadsArr[i].keyTrigger} 
            id={drumPadsArr[i].id} url={drumPadsArr[i].url} displayCallback = {this.handleDisplay}/>
          )
        }
        });
      return(
        <div id="drum-machine">
          <div className="pads">
            <div id="keys">{drumPadsDisplayed}</div>
          </div>
          <div id="display">
            <h1>Drum Machine</h1>
            <h3>By <a href="https://github.com/Muchiashvili" target="_blank">Lekso Muchiashvili</a></h3>
            <div className="button">
              <div className="power-button" style={this.state.boxStyle}>
                <div className="power-click" onClick={this.turnPower} style={this.state.powerStyle}/>
              </div>
              <div className="bank">
                <p>Bank {this.state.bankName}</p>
                <div className="bank-button">
                  <div className="bank-click" onClick={this.changeBank} style={this.state.bankStyle}></div>
                </div>
              </div>
            </div>
            <div className="padName">
              <p>{this.state.display}</p>
            </div>
          </div>
        </div>
      );
    }
}
ReactDOM.render( <DrumMachine />, document.getElementById('root') );
