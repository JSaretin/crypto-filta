<script>
  import { getContext } from "svelte";

  import Transaction from "./Transaction.svelte";

  export let transactions = [];
  export let transactionFilter;
  export let coin;

  let filtteredTransactions = [];

  const audio = getContext("audio");

  const filterSend = (sends) => {
    return sends.reduce((acc, send) => {
      const amount = send.value / 1e8;
      if (
        transactionFilter.amount.min !== undefined &&
        transactionFilter.amount.min >= 0 &&
        transactionFilter.amount.max !== undefined &&
        transactionFilter.amount.max >= transactionFilter.amount.min
      ) {
        if (
          amount >= transactionFilter.amount.min &&
          amount <= transactionFilter.amount.max
        ) {
          if (send.address !== null && !send.address.startsWith("b")) {
            return send;
          }
          return acc;
        }
      }
    }, undefined);
  };

  const filterReceive = (rcvs) => {
    return rcvs.reduce((acc, rcv) => {
      const amount = rcv.value / 1e8;
      if (
        transactionFilter.amount.min !== undefined &&
        transactionFilter.amount.min >= 0 &&
        transactionFilter.amount.max !== undefined &&
        transactionFilter.amount.max >= transactionFilter.amount.min
      ) {
        if (
          amount >= transactionFilter.amount.min &&
          amount <= transactionFilter.amount.max
        ) {
          if (rcv.addr !== null && !rcv.addr.startsWith("b")) {
            return rcv;
          }
          return acc;
        }
      }
    }, undefined);
  };

  $: filtteredTransactions = transactions.reduce(
    (filtered, { transaction }) => {
      if (transactionFilter.sent) {
        const send = filterSend(transaction.inputs);
        if (send) {
          if (transactionFilter.notify) {
            audio.play();
          }
          const cleandTransaction = {
            from: send.address,
            value: (send.value / 1e8) * 1e18,
            to: transaction.out[0].addr,
            hash: transaction.hash,
            timestamp: transaction.time,
          };

          return [...filtered, cleandTransaction];
        }
      } else {
        const receive = filterReceive(transaction.out);
        if (receive) {
          if (transactionFilter.notify) {
            audio.play();
          }
          return [
            ...filtered,
            {
              from: transaction.inputs[0].address,
              value: (receive.value / 1e8) * 1e18,
              to: receive.addr,
              hash: transaction.hash,
              timestamp: transaction.time,
            },
          ];
        }
      }
      return filtered;
    },
    []
  );
</script>

{#each filtteredTransactions as transaction}
  <Transaction {transaction} {coin} />
{/each}
