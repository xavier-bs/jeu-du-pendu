import React, { Component } from 'react'

class Pendu extends Component {

  constructor(props) {
    super(props)
    this.draws = [
      'gallows', 
      'head', 
      'body', 
      'rightHarm', 
      'leftHarm',
      'rightLeg',
      'leftLeg',
      'rightFoot',
      'leftFoot',
    ]
  }

  componentDidUpdate() {
    if ( this.props.step === 0 ) {
      this.clearCanvas()
    }
    else {
      this.Draw(this.draws[this.props.step - 1])
    }
  }

  Draw = (step) => {
    const ctx = this.refs.hangman.getContext("2d");
    switch (step) {
      case 'gallows' :
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 10; 
        ctx.beginPath();
        ctx.moveTo(175, 225);
        ctx.lineTo(5, 225);
        ctx.moveTo(40, 225);
        ctx.lineTo(25, 5);
        ctx.lineTo(100, 5);
        ctx.lineTo(100, 25);
        ctx.stroke();
        break;

      case 'head':
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(100, 50, 25, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.stroke();
        break;

      case 'body':
        ctx.beginPath();
        ctx.moveTo(100, 75);
        ctx.lineTo(100, 140);
        ctx.stroke();
        break;

      case 'rightHarm':
        ctx.beginPath();
        ctx.moveTo(100, 85);
        ctx.lineTo(60, 100);
        ctx.stroke();
        break;

      case 'leftHarm':
        ctx.beginPath();
        ctx.moveTo(100, 85);
        ctx.lineTo(140, 100);
        ctx.stroke();
        break;

      case 'rightLeg':
        ctx.beginPath();
        ctx.moveTo(100, 140);
        ctx.lineTo(80, 190);
        ctx.stroke();
        break;

      case 'rightFoot':
        ctx.beginPath();
        ctx.moveTo(82, 190);
        ctx.lineTo(70, 185);
        ctx.stroke();
        break;

      case 'leftLeg':
        ctx.beginPath();
        ctx.moveTo(100, 140);
        ctx.lineTo(125, 190);
        ctx.stroke();
        break;

      case 'leftFoot':
        ctx.beginPath();
        ctx.moveTo(122, 190);
        ctx.lineTo(135, 185);
        ctx.stroke();
        break;

      default:
        break;
    } 
  }   

  clearCanvas = () => {
    const canvas = this.refs.hangman
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }


  render() {
    return (
      <canvas ref="hangman" width={200} height={250}></canvas>
    )
  }

} 

export default Pendu