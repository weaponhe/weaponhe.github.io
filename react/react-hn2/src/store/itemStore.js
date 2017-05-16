import EventEmitter from 'events'

import
{
  fetch, fetchItem
}from './store'

let cacheIds = {},
  cacheItems = {}

export default class ItemStore extends EventEmitter {
  constructor(type) {
    super()
    this.type = type
    if (!cacheIds[type]) {
      cacheIds[type] = []
    }
    if (!cacheItems[type]) {
      cacheItems[type] = []
    }
  }

  start() {
    fetch(`${this.type}stories`).then((ids) => {
      cacheIds[this.type] = ids
      this.emit('update', this.getState())
    })
  }

  fetchItemById(id) {
    return fetchItem(id)
  }

  getState() {
    console.log({
      ids: cacheIds[this.type],
      items: cacheItems[this.type]
    })
    return {
      ids: cacheIds[this.type],
      items: cacheItems[this.type]
    }
  }
}