import { Alert, Button, Col, Input, Space, Typography } from "antd";
import axios from "axios";
import { useState } from "react";
import {SOLANA_NETWORKS as NETWORK} from 'types';
import {getInnerState} from 'utils/context';
import {useGlobalState} from 'context';
import { transactionExplorer } from "solana/lib";
import { connect } from "react-redux";



const {Text} = Typography;

function Fund(props) {
  
  const {networkInfo, dispatch} = props;
  // const {address, network: network0} = getInnerState(state);
  const {address, network} = networkInfo;
  //  Need this fix as DATAHUB doesn't have airdrop feature
  // const network = network0 === NETWORK.DATAHUB ? NETWORK.DEVNET : network0;

  const [fetching, setFetching] = useState<boolean>(false);
  const [hash, setHash] = useState<string | null>(null);
  
  

  const airdrop = async () => {
    setFetching(true);
    setHash(null);

    try {
      const res = await axios.post(`/api/fund`,{address, network})
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <Col>
      <Space direction="vertical">
        <Input
          style={{width: '420px', fontWeight: 'bold'}}
          defaultValue={address}
          disabled={true}
        />
        <Button type="primary" onClick={airdrop} loading={fetching}>
          Fund this address
        </Button>
        {hash && (
          <Alert
            message={<Text strong>Address Funded!</Text>}
            description={
              <a
                href={transactionExplorer(network)(hash)}
                target="_blank"
                rel="noreferrer"
              >
                View on Solana Explorer
              </a>
            }
            type="success"
            showIcon
          />
        )}
      </Space>
    </Col>
  )
}

export default connect(
  state => ({...state})
)(Fund)