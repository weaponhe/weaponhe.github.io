import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
export default class Pager extends React.Component {
  onClick = (e) => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)
  }

  render() {
    const {page, hasNext, route} = this.props
    if (page === 1 && !hasNext) {
      return null
    }
    return (
      <div>
        {(page > 1) &&
        <Link to={`/${route}?page=${page - 1}`} onClick={this.onClick}>Prev</Link>}
        {hasNext &&
        <Link to={`/${route}?page=${page + 1}`} onClick={this.onClick}>More</Link>}
      </div>
    )
  }
}

Pager.propTypes = {
  page: PropTypes.number.isRequired,
  route: PropTypes.string.isRequired,
  hasNext: PropTypes.bool.isRequired
}
