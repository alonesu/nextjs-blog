import type {NextApiRequest, NextApiResponse} from 'next';
import { Keypair } from '@solana/web3.js';

type ResponseT = {
  secret: string;
  address: string;
}

export default function keypair(
  req: NextApiRequest,
  res: NextApiResponse<string | ResponseT>,
) {
  try {
    // 生成密钥对
    const keypair = Keypair.generate();
    const address = keypair?.publicKey.toString();
    const secret = JSON.stringify(Array.from(keypair.secretKey));
    res.status(200).json({
      secret,
      address,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown Error';
    res.status(500).json(errorMessage)
  }
}