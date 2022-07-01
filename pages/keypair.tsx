import { Alert, Button, Col, Space, Typography } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import { useState } from "react";

const {Text} = Typography;

function index(props) {
  // console.log(props);
  
  
  // const  store = props.store;
  

  const [fetching, setFetching] = useState<boolean>(false)
  const [address, setAddress] = useState<string | null>(null)
  const generateKeypair = async () => {
    setFetching(true);
    setAddress(null);
    try {
      const res = await axios.get(`/api/keypair`)
      setAddress(res.data.address)
      props.dispatch({type: 'address', address: res.data.address})
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  }
  return (
    <Col>
      <Space>
        <Button
          type="primary"
          onClick={generateKeypair}
          style={{marginBottom: '20px'}}
          loading={fetching}
        >
          Generate Keypair
        </Button>
        {
          address ? (
            <Alert
              message={
                <Space>
                  <Text>Keypair generated!</Text>
                </Space>
              }
              description={
                <div>
                  <div>
                    This is the string representation of the public key <br />
                    <Text code>{address}</Text>
                  </div>
                  <Text>
                    Accessible (and copyable) at the top right of this page.
                  </Text>
                </div>
              }
              type="success"
              showIcon
            />
          ) : (
            <Alert message="Please Generate a Keypair" type="error" showIcon />
          )
        }
      </Space>
    </Col>
  )
}

export default    connect(
  state => ({...state})
)(index)

