<script>
  import { getContext } from "svelte";

  import Transaction from "./Transaction.svelte";

  const audio = getContext("audio");

  export let transactions = [];
  export let transactionFilter;

  let filtteredTransactions = [];
  $: filtteredTransactions = transactions
    .filter(({ transaction }) => {
      if (
        transactionFilter.amount.min !== undefined &&
        transactionFilter.amount.min >= 0 &&
        transactionFilter.amount.max !== undefined &&
        transactionFilter.amount.max >= transactionFilter.amount.min
      ) {
        const amount = transaction.value / 1e18;
        const isQualified =
          amount >= transactionFilter.amount.min &&
          amount <= transactionFilter.amount.max;
        if (isQualified) {
          const qualified = transactionFilter.withData
            ? true
            : !transaction.data;
          if (qualified) {
            if (transactionFilter.notify) {
              audio.play();
            }
            return true;
          }
        }
      }
    })
    .sort((a, b) => {
      return b.transaction.timestamp - a.transaction.timestamp;
    });
</script>

{#each filtteredTransactions as { transaction }}
  <Transaction {transaction} coin={"eth"} />
{/each}
