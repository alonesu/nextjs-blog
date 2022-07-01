import { Col, Button, Space, Alert, Typography } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useState } from 'react';
import Confetti from 'react-confetti'

// import store from 'redux/store';

import { getInnerState, getChainLabel } from 'utils/context'
import {useGlobalState} from 'context';

const {Text} = Typography;

export default function Connect(props) {
  const {state, dispatch} = useGlobalState();
  const {network} = getInnerState(state);
  const chainLabel = getChainLabel(state);

  const [version, setVersion] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(null);
  const [error, setError] = useState<string | null>(null);

  const getConnection =async () => {
    setFetching(true);
    setError(null);
    setVersion(null);
    try {
      const response = await axios.post(`api/connect`, {network: 'localnet'});
      setVersion(response.data);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setFetching(false);
    }
  }
  // console.log(store.getState().network.network);
  
  
  return (
    <Col>
      {version && (
        // numberOfPieces 一次五彩纸的数量 tweenDuration 五彩纸添加的速度
        <Confetti numberOfPieces={500} tweenDuration={1000} gravity={0.05} />
      )}
      <Space direction='vertical' size='large'>
        <Space>
          <Button
            type='primary'
            icon={<PoweroffOutlined />}
            onClick={getConnection}
            // loading={fetching}
            size='large'
          />
          {version ? (
            <Alert
              message={
                <Text>
                  Connected to {chainLabel}:<Text code>version {version}</Text>
                </Text>
              }
              type="success"
              showIcon
            />
          ) : error ? (
            <Alert
              message={
                <Space>
                  <Text code>Error: {error}</Text>
                </Space>
              }
              type="error"
              showIcon
            />
          ) : (
            <Alert
              message={<Space>Not Connected to {chainLabel}</Space>}
              type="error"
              showIcon
            />
          )}
        </Space>
      </Space>
    </Col>
  )
}