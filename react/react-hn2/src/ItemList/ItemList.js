import React from 'react'
import PropTypes from 'prop-types'
import querystring from 'querystring'
import ItemStore from '../store/itemStore'
import Item from './Item'
import Spinner from '../Spinner/Spinner'
import './ItemList.css'


export default class ItemList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      ITEMS_PER_PAGE: 10,
      ids: [],
      stories: [],
      limit: props.limit
    }
  }


  componentWillMount() {
    this.store = new ItemStore(this.props.type)
    this.store.addListener('update', this.handleUpdate)
    this.store.start()
    this.setState(this.store.getState())
  }

  componentWillUnmount() {
    this.store.removeListener('update', this.handleUpdate)
  }

  handleUpdate = (update) => {
    update.limit = update.ids.length
    this.setState(update)
  }

  render() {
    let page = pageCalc(this.getPageNumber(), this.state.ITEMS_PER_PAGE, this.props.limit)
    if (this.state.stories.length === 0 && this.state.ids.length === 0) {
      let dummyItems = []
      for (let i = page.startIndex; i < page.endIndex; i++) {
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
        {this.renderItems(page.startIndex, page.endIndex)}
      </ol>
    )
  }

  renderItems(startIndex, endIndex) {
    let rendered = []
    for (let i = startIndex; i < endIndex; i++) {
      let id = this.state.ids[i],
        item = this.state.stories[i]
      rendered.push(<Item key={id} index={i} id={id} cachedItem={item} store={this.store}/>)
    }
    return rendered
  }

  getPageNumber(page) {
    if (typeof page === 'undefined') {
      let query = querystring.parse(this.props.location.search.slice(1))
      page = query.page
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

ItemList.propTypes = {
  type: PropTypes.string.isRequired,
  limit: PropTypes.number
}

ItemList.defaultProps = {
  limit: 200
}