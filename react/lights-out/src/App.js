import React from 'react';
import classNames from 'classnames'

import './App.css';

var boards = [
  [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1]
  ],
  [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
  ],
  [
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0]
  ]
]

class Switch extends React.Component {
  render() {
    var classes = classNames({
      'switch': true,
      'switch-done': this.props.done,
      'switch-on': this.props.isOn,
      'switch-off': !this.props.isOn
    })
    return <div className={classes} onClick={this.props.onClick}/>
  }
}

export default class LightsOut extends React.Component {
  constructor() {
    super()
    this.state = {
      board: this.getNewRandomBoard(),
      done: false
    }
  }

  getNewRandomBoard() {
    // clone a board
    return boards[Math.floor(Math.random() * boards.length)].map(function (row) {
      return row.map(function (cell) {
        return cell;
      });
    });
  }

  handleSwitchClick(i, j) {
    var board = this.state.board;
    board[i][j] = !board[i][j];
    if (i !== 0) board[i - 1][j] = !board[i - 1][j];
    if (i !== board[i].length - 1) board[i + 1][j] = !board[i + 1][j];
    if (j !== 0) board[i][j - 1] = !board[i][j - 1];
    if (j !== board.length - 1) board[i][j + 1] = !board[i][j + 1];

    var done = this.state.board.every(function (row) {
      return row.every(function (cell) {
        return !!cell;
      });
    });
    // setState is asynchronous. Pass a callback that verifies if all the lights
    // are on; if so, create new game
    this.setState({board: this.state.board, done: done}, function () {
      if (done) {
        setTimeout(function () {
          this.setState({
            board: this.getNewRandomBoard(),
            done: false
          });
        }.bind(this), 1500);
      }
    }.bind(this));
  }

  render() {
    return (
      <div>
        {
          this.state.board.map(function (row, i) {
            return (
              <div key={i}>
                {row.map(function (cell, j) {
                  return (
                    <Switch key={j}
                            isOn={!!cell}
                            done={this.state.done}
                            onClick={this.handleSwitchClick.bind(this, i, j)}/>
                  )
                }, this)}
              </div>
            )
          }, this)
        }
      </div>
    )
  }
}




