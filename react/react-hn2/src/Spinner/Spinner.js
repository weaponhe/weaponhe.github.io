import React from 'react'
import './Spinner.css'
export default class ItemSpinner extends React.Component {
  render() {
    var bounceSize = this.props.size + 'px'
    var bounceStyle = {height: bounceSize, width: bounceSize, marginRight: this.props.spacing + 'px'}
    return <div className="Spinner"
                style={{width: ((Number(this.props.size) + Number(this.props.spacing)) * 3) + 'px'}}>
      <div className="bounce1" style={bounceStyle}/>
      <div className="bounce2" style={bounceStyle}/>
      <div className="bounce3" style={bounceStyle}/>
    </div>
  }
}