import type { ContractTransaction } from "@ethersproject/contracts"
import { showTxModal, pendingTx, txHash, txTitle } from "../store"
import type { Address } from './eth-helper'
import { provider } from './eth-helper'
import { notifier } from '@beyonk/svelte-notifications'
import type { Notifier } from '../types/notifier'
import type { Transaction } from "@ethersproject/transactions"

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
    let errorMessage = 'Une erreur est survenue.';
    if (code === 4001) { // Denied by user
      return;
    }
    errorMessage += ` ${(data as TxError).message}`

    return (notifier as Notifier).danger(errorMessage);
  }
  const hash = (data as ContractTransaction).hash as Address
  txHash.set(hash);
  pendingTx.set(true);
  provider.once(hash, (_t: Transaction) => {
    (notifier as Notifier).success('Transaction confirmée !');
    pendingTx.set(false);
  });
  onEnd?.();
}

function parseErrorMessage(error: TxError) {
  const { code, message } = error;
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
