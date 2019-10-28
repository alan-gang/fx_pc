import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { getAnimalOfNumber } from '../../utils/num';

import './rollingNumbers.styl';

interface Props {
  store?: any;
  gameType?: string;
  numbers: string[];
  hl: string;
}


@inject("store")
@observer
class RollingNumbers extends Component<Props, object> {
  type: number = 1;
  displayNumbers() {
    return this.props.numbers.map(n => {
      if (typeof n === 'object' && n[0] !== undefined) {
        // return n.map(nn => {
        //   return getAnimalOfNumber(nn)[this.type - 2] || nn
        // })
      } else {
        return getAnimalOfNumber(n)[this.type - 2] || n
      }
    })
  }
  setPosColor(i: number) {
    switch (this.props.hl) {
      case 'q5':
        if (i < 5) return 'hl'
        break
      case 'q4':
        if (i < 4) return 'hl'
        break
      case 'q2':
        if (i < 2) return 'hl'
        break
      case 'q3':
        if (i < 3) return 'hl'
        break
      case 'z3':
        if (i < 4 && i > 0) return 'hl'
        break
      case 'h2':
        if (i > 2) return 'hl'
        break
      case 'h3':
        if (i > 1) return 'hl'
        break
      case 'h4':
        if (i > 0) return 'hl'
        break
    }
  }
  render() {
    // console.log('displayNumbers=', this.displayNumbers())
    return (
      <div className="rolling-numbers pos-r">
        {this.props.gameType !== 'k3' && this.props.numbers.map((n, i) => (
          <div className="number-box" key={i} >
            <div className={`number ${this.setPosColor(i) ? this.props.hl : ''}`}>
              <div className="the-number-box" style={{transform: 'translateY(' + (-n / (this.props.numbers.length > 10 ? 0.81 : 0.5))  + '%)' , transition: 'transform ' + (1 + (1 * i))  + 's ease '}}>
                {Array.from(Array(this.props.numbers.length > 10 ? 81 : 50)).map((nn: number, j: number) => (
                  <div className="the-number" key={j}>{ j === parseInt(n, 10) ? this.displayNumbers()[i] : j }</div>
                ))}
              </div>
            </div>
            <div className={`decorations  n_${n}`}></div>
          </div>
          )
        )}
        {this.props.gameType === 'pcdd' && 
          <div className="number-gaps">
          <div className="number-gap">+</div>
          <div className="number-gap">+</div>
          <div className="number-gap">=</div>
          <div className="number.number-gap">
            <div className="the-number-box">
              <div className="the-number">{ parseInt(this.props.numbers[0], 10) + parseInt(this.props.numbers[1], 10) + parseInt(this.props.numbers[2]) }</div>
            </div>
          </div>
        </div>
        }
        {this.props.gameType === 'k3' && this.props.numbers.slice(0, 3).map((num, i) => (
            <div className="dice-box inlb" key={i}>{num}</div>
          )
        )}
      </div>
    )
  }
}

export default RollingNumbers;
