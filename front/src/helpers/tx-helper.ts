import type { ContractTransaction } from '@ethersproject/contracts'
import type { Transaction } from '@ethersproject/transactions'
import type { Address } from './eth-helper'
import { showTxModal, pendingTx, txHash, txTitle } from '../store'
import { provider } from './eth-helper'
import { Toast } from 'spaper'

interface TxError extends Error {
  code?: number|string;
  data?: Object;
  stack?: string;
}

async function doTransaction(
  tx: Function, params: any[] = []
): Promise<[ContractTransaction|TxError, boolean]> {
  try {
    const result: ContractTransaction = await tx.apply(null, params)
    return [result, true]
  } catch(error) {
    return [parseErrorMessage(error), false]
  }
}

export async function handleTxWithUx(
  title: string,
  tx: Function,
  params: any[] = [],
  onEnd?: Function,
) {
  showTxModal.set(true);
  txTitle.set(title);
  const [data, success] = await doTransaction(
    tx,
    params
  );

  if (!success) {
    showTxModal.set(false);
    const { code } = data as TxError;
    if (code === 4001) { // Denied by user
      return;
    }
    // TODO: use .error when available
    return Toast.danger({
      message: `Une erreur est survenue. ${data}`,
      indefinite: true
    });
  }
  const hash = (data as ContractTransaction).hash as Address
  txHash.set(hash);
  pendingTx.set(true);
  provider.once(hash, (_t: Transaction) => {
    Toast.success('Transaction confirmée !');
    pendingTx.set(false);
  });
  onEnd?.();
}

function parseErrorMessage(error: TxError) {
  const { code, message } = error;
  if (code === 'INSUFFICIENT_FUNDS')
    return 'Fonds insuffisants.'
  if (typeof code === 'number')
    return error

  try {
    return JSON.parse(message.substring(
      message.indexOf('{'),
      message.indexOf('}}}') + 3
    ));
  } catch {
    return error;
  }
}
