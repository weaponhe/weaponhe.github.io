import EventEmitter from 'events'

import
{
  fetch, fetchItem
}from './store'

let idsCache = {},
  itemsCache = {},
  storyLists = {}
function populateStoryList(type) {
  let ids = idsCache[type]
  let storyList = storyLists[type]
  ids.forEach((id, idx) => {
    storyList[idx] = itemsCache[id] || null
  })
}
function parseJSON(json, defaultValue) {
  return (json ? JSON.parse(json) : defaultValue)
}

export default class ItemStore extends EventEmitter {
  constructor(type) {
    super()
    this.type = type
    if (!(type in idsCache)) {
      idsCache[type] = []
    }
    if (!(type in storyLists)) {
      storyLists[type] = []
      populateStoryList(type)
    }
  }

  start() {
    fetch(`${this.type}stories`).then((ids) => {
      idsCache[this.type] = ids
      populateStoryList(this.type)
      this.emit('update', this.getState())
    })
  }

  updateItem(item, index) {
    storyLists[this.type][index] = item
    itemsCache[item.id] = item
  }

  fetchItemById(id) {
    return fetchItem(id)
  }

  getState() {
    return {
      ids: idsCache[this.type],
      stories: storyLists[this.type]
    }
  }
}

Object.assign(ItemStore, {
  saveSession() {
    window.sessionStorage.setItem('idsCache', JSON.stringify(idsCache))
    window.sessionStorage.setItem('itemsCache', JSON.stringify(itemsCache))
  },
  loadSession() {
    idsCache = parseJSON(window.sessionStorage.getItem('idsCache'), {})
    itemsCache = parseJSON(window.sessionStorage.getItem('itemsCache'), {})
  }
})