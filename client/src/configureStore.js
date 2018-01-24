import { createStore, applyMiddleware, compose } from "redux"
import reducer from "reducers"

import logger from 'redux-logger'
import promise from 'redux-promise'
import thunk from 'redux-thunk'

const applyMiddlewareToStore = (store, middlewares) => {
  middlewares.slice().reverse().forEach(middleware => {
    store.dispatch = middleware(store)(store.dispatch)
  })
}

const configureStore = () => {
  const middlewares = [thunk, logger]

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )

  store.subscribe(() => {
    saveState({
      lifts: store.getState().lifts
    })
  })

  return store
}

export default configureStore
