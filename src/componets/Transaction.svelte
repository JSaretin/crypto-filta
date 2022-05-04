<script>
  export let transaction;
  export let coin;
  

  const getTransactionAge = () => {
    const now = new Date().getTime();
    const age = now - transaction.timestamp * 1000;

    const days = Math.floor(age / (1000 * 60 * 60 * 24));
    const hours = Math.floor(age / (1000 * 60 * 60));
    const minutes = Math.floor(age / (1000 * 60));
    const seconds = Math.floor(age / 1000);

    let ageString = "";
    if (days > 0) {
      ageString += `${days} days ago `;
    } else if (hours > 0) {
      ageString += `${hours} hours ago `;
    } else if (minutes > 0) {
      ageString += `${minutes} minutes ago `;
    } else if (seconds > 0) {
      ageString += `${seconds} seconds ago `;
    } else {
      ageString += "just now";
    }

    return ageString;
  };

  let createdAge = getTransactionAge();
  setInterval(() => {
    createdAge = getTransactionAge();
  }, 1000);
</script>

<div class="transaction">
  <p class="hash">
    <span class="label">Hash:</span>
    <a
      href={`https://blockchain.info/${coin}/tx/${transaction.hash}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {transaction.hash}
    </a>
  </p>

  <p class="created">
    <span class="label">Created:</span>
    <span>
      {createdAge}
    </span>
  </p>

  <p class="amount">
    <span class="label">Amount:</span>
    <span>{(transaction.value / 1e18).toFixed(8)} {coin}</span>
  </p>

  <p class="sender">
    <span class="label">Sender:</span>
    <a
      href={`https://blockchain.info/${coin}/address/${transaction.from}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {transaction.from}
    </a>
  </p>

  <p class="receiver">
    <span class="label">Receiver:</span>
    <a
      href={`https://blockchain.info/${coin}/address/${transaction.to}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {transaction.to}
    </a>
  </p>
</div>

<style>
  .transaction {
    width: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: #fafafa;
  }

  .transaction p {
    margin: 0;
    font-size: 14px;
    white-space: nowrap;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .label {
    font-weight: bold;
    display: none;
  }

  .hash,
  .sender,
  .receiver {
    width: calc(100% / 4);
  }

  .transaction span,
  .transaction a {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .transaction a {
    color: #00a8ff;
    text-decoration: none;
  }

  .transaction a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .transaction {
      flex-direction: column;
      gap: 10px;
      align-items: flex-start;
      justify-content: flex-start;
    }

    .label {
      display: inline;
    }

    .transaction p {
      width: 100%;
    }

    .hash,
    .sender,
    .receiver {
      width: 100%;
    }

    p span {
      width: fit-content;
    }
  }
</style>
