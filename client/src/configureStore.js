import { createStore } from "redux"
import reducer from "reducers"
import sampleData from "./sampleData"

import { loadState, saveState } from "./localStorage"

// monkeypatching dispatch examples
const addLoggingToDispatch = (store) => {
  const next = store.dispatch
  return (action) => {
    console.group(action.type)
    console.log('prev state:', store.getState())
    console.log('action:', action)
    const result = next(action)
    console.log('new state:', store.getState())
    console.groupEnd()
    return result
  }
}

const addPromiseToDispatch = (store) => {
  const next = store.dispatch
  return (action) => {
    if (typeof action.then === 'function') {
      return action.then(next)
    }
    return next(action)
  }
}

const configureStore = () => {
  const persistedState = loadState()
  // const persistedState = sampleData

  const store = createStore(
    reducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  
  store.dispatch = addLoggingToDispatch(store)
  store.dispatch = addPromiseToDispatch(store)

  store.subscribe(() => {
    saveState({
      lifts: store.getState().lifts
    })
  })
  return store
}

export default configureStore
