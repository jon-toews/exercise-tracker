import { createStore, applyMiddleware, compose } from "redux"
import reducer from "reducers"

import logger from 'redux-logger'
import promise from 'redux-promise'
import thunk from 'redux-thunk'


const configureStore = () => {
  const middlewares = [thunk, logger]

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(...middlewares),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )

  

  return store
}

export default configureStore
