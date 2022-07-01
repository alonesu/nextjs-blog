import {connect} from "react-redux";


function Test(props) {
  // const store = props.store
  // console.log(props);
  

  return (
    <div>address:{props.store.networkInfo.address}</div>
  )
}

export default connect(
  state => ({store: state})
)(Test)