import React from 'react'
import
{
  fetch, fetchItems
} from '../store/store'

export default class ItemsList extends React.Component {

  constructor() {
    super()
    this.state = {
      stores: []
    }
  }

  componentDidMount() {
    fetch(`${this.props.type}stories`).then((ids) => {
      return fetchItems(ids.slice(0, 10))
    }).then((items) => {
      console.log(items)
      this.setState({stores: items})
    })
  }

  render() {
    return (
      <ul>
        {this.state.stores.map(({id, title, type}) => (
          <li key={id}>
            {id}
          </li>
        ))}
      </ul>
    )
  }
}