

import { SWITCH_MENU } from '../action'

const initialState = {
    menuName: '首页'
}

export function switchMenuName(state=initialState, action) {
    switch(action.type) {
        case SWITCH_MENU: {
            return {
                ...state,
                menuName: action.menuName
            }
        }
        default:
            return state;
    }
}