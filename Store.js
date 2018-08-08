import {createStore} from 'redux'

function reducer(state = {},action) {
    switch (action.type) {
      case 'SET_DATA': return { ...state, data : action.data} ; break;
      case 'SET_CONFIG' : return { ...state, AppConfig : action.data} ; break;
      default: return state;
    }
  }
export const store = createStore(reducer);
