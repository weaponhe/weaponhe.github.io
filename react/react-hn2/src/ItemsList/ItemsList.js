import React from 'react'
import
{
  fetch, fetchItems
}from '../store/store'
import Spinner from '../Spinner/Spinner'
import './ItemsList.css'


export default class ItemsList extends React.Component {

  constructor() {
    super()
    this.state = {
      ITEMS_PER_PAGE: 10,
      ids: [],
      items: []
    }
  }

  componentDidMount() {
    fetch(`${this.props.type}stories`).then((ids) => {
      return fetchItems(ids.slice(0, 10))
    }).then((items) => {
      console.log(items)
      this.setState({items: items})
    })
  }

  render() {
    if (this.state.items.length === 0 && this.state.ids.length === 0) {
      let dummyItems = []
      for (let i = 0; i < 10; i++) {
        dummyItems.push(<Spinner key={i}/>)
      }

      return (
        <ol>
          {dummyItems}
        </ol>
      )

    }
    return (
      <ol>
        {this.state.items.map(({id, title, type}) => (
          <li key={id}>
            {id}
          </li>
        ))}
      </ol>
    )
  }

  getPageNumber(page) {
    if (typeof page === 'undefined') {
      page = this.props.location.query.page
    }
    return (page && /^\d+$/.test(page) ? Math.max(1, Number(page)) : 1)
  }
}

function pageCalc(pageNum, pageSize, numItems) {
  var startIndex = (pageNum - 1) * pageSize
  var endIndex = Math.min(numItems, startIndex + pageSize)
  var hasNext = endIndex < numItems - 1
  return {pageNum, startIndex, endIndex, hasNext}
}