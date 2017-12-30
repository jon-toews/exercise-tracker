import { createStore } from "redux"
import reducer from "reducers"
import sampleData from "./sampleData"

import { loadState, saveState } from "./localStorage"

const configureStore = () => {
  const persistedState = loadState()
  // const persistedState = sampleData

  const store = createStore(
    reducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  store.subscribe(() => {
    saveState({
      lifts: store.getState().lifts
    })
  })
  return store
}

export default configureStore
