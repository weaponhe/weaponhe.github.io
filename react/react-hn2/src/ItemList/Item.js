import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import ItemStore from '../store/itemStore'
import Spinner from '../Spinner/Spinner'
export default class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: props.cachedItem
    }
  }

  componentWillMount() {
    this.props.store.fetchItemById(this.props.id).then((item) => {
      this.setState({item})
      console.log(item)
    })
  }


  render() {
    if (!this.state.item || !this.state.item.id) {
      return (
        <li className="item">
          <Spinner/>
        </li>
      )
    } else {
      return (
        <li className="item">
          <h4>{this.state.item.title}</h4>
          <span>{this.state.item.score} point{this.state.item.score > 1 ? 's' : ''}</span>
          <span>by <Link to={`/user/${this.state.item.by}`}>{this.state.item.by}</Link></span>
        </li>
      )
    }
  }
}

Item.propTypes = {
  id: PropTypes.number,
  index: PropTypes.number,
  cachedItem: PropTypes.object,
  store: PropTypes.instanceOf(ItemStore).isRequired,
}

Item.defaultProps = {
  id: null,
  index: null,
  cachedItem: null
}

