const LOCALNET = 'localnet';
const ADDRESS = 'address'


const initialState = {
  network: 'localnet',
  address: '',
}

export default function Address(state = initialState, action : {type: string,[propsName: string]: any}) {
  switch (action.type) {
    case LOCALNET:
      return {
        ...state,
        network: 'localnet',
      }
    case ADDRESS:
      console.log(action);
      
      return {
        ...state,
        address: action.address,
      }
    default:
      return state
  }
}