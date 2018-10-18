// createStore保存数据
import { createStore } from 'redux'
import { switchMenuName } from '../reducer'

let configureStore = (prevState)=>createStore(switchMenuName, prevState);

export default configureStore;