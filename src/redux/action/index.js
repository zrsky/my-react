
export const SWITCH_MENU = 'SWITCH_MENU';

export function switchMenu(menuName){
    return {
        type: SWITCH_MENU,
        menuName
    }
}
