import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { resultSlice } from './result/slice';
import { userSlice } from './user/slice';
import { typeSlice } from './type/slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer,  FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'


const rootReducer = combineReducers({
    result: resultSlice.reducer,
    user: userSlice.reducer,
    resultType:typeSlice.reducer
})
const persistConfig = {
    key: 'root',
    version:1,
    stateReconciler: hardSet,
    storage,
  }
const persistedReducer=persistReducer(persistConfig, rootReducer)
// const store = createStore(rootReducer, applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const store=configureStore({reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    devTools:true})

export default store;