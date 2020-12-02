import {
	applyMiddleware, 
	compose, 
	createStore 
} from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from '../reducers/rootReducer'

const windowExist = typeof window !== 'undefined'

const reduxDevtools = windowExist && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const composeEnhancers = reduxDevtools || compose

export const store = createStore(
	rootReducer, 
	composeEnhancers(applyMiddleware(thunk))
)
