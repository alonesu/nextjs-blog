import type {NextApiRequest, NextApiResponse} from 'next';
import {getNodeURL} from 'solana/lib';
import {Connection} from '@solana/web3.js';

export default async function connect(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const {network} = req.body;
    const url = getNodeURL(network);
    // 创建连接实例 new Connection(endpoint: string, commitmentOrConfig?: Commitment | ConnectionConfig): Connection
    // API:https://solana-labs.github.io/solana-web3.js/classes/Connection.html#constructor 
    /**
     * Params
     * - endpoint: string
     *   - URL to the fullnode JSON RPC endpoint
     * - Optional CommitmentOrConfig: Commitment | ConnectionConfig
     *   - optional default commitment level or optional ConnectionConfig configuration object
     * 
     *   - Commitment(https://solana-labs.github.io/solana-web3.js/modules.html#Commitment)
     *   - ConnectionConfig(https://solana-labs.github.io/solana-web3.js/modules.html#ConnectionConfig)
     * Returns Connection
     */
    const connection = new Connection(url, 'confirmed');
    // 在实例上调用getVersion方法，该方法返回一个promise
    const version = await connection.getVersion();
    res.status(200).json(version['solana-core']);
  } catch (error) {
    let errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage);
  }
}
