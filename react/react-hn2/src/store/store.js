import api from './api'


export let fetch = child =>
  new Promise((resolve, reject) => {
    api.child(child).once('value', snapshot => {
      const val = snapshot.val()
      resolve(val)
    }, reject)
  })

export let fetchItem = id => fetch(`item/${id}`)

export let fetchItems = ids => {
  return Promise.all(ids.map(id => {
      return fetchItem(id)
    }
  ))
}

