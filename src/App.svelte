<script>
  import { setContext } from "svelte";

  import Bitcoin from "./componets/Bitcoin.svelte";

  import Ethereum from "./componets/Ethereum.svelte";

  export let transactions;

  const audio = new Audio("/beep.wav");

  setContext("audio", audio);

  let hash = window.location.hash.slice(1).toLowerCase();

  hash = hash || "btc";

  let transactionFilter = {
    amount: {
      min: 0,
      max: 100000,
    },
    sent: true,
    notify: false,
  };
</script>

<div class="container">
  <div class="row">
    <div class="col-md-12">
      <h1>Transactions</h1>
    </div>

    <div class="col-md-12">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="amount">Amount</label>
            <div class="row">
              <div class="col-md-6">
                <input
                  type="number"
                  class="form-control"
                  id="amountMin"
                  placeholder="Min"
                  bind:value={transactionFilter.amount.min}
                />
              </div>
              <div class="col-md-6">
                <input
                  type="number"
                  class="form-control"
                  id="amountMax"
                  placeholder="Max"
                  bind:value={transactionFilter.amount.max}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-12">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="notify">Notify</label>
            <div class="row">
              <div class="col-md-6">
                <input
                  type="checkbox"
                  class="form-control"
                  id="notify"
                  bind:checked={transactionFilter.notify}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {#if hash !== "eth"}
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="sent">Sent</label>
              <div class="row">
                <div class="col-md-6">
                  <input
                    type="checkbox"
                    class="form-control"
                    id="sent"
                    bind:checked={transactionFilter.sent}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}

    <div class="col-md-12">
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="date">Date</label>
            <div class="row">
              <div class="col-md-6">
                <input
                  type="date"
                  class="form-control"
                  id="dateMin"
                  placeholder="Min"
                />
              </div>
              <div class="col-md-6">
                <input
                  type="date"
                  class="form-control"
                  id="dateMax"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12">
      <h2>Filtered Transactions</h2>

      <div class="transactions">
        {#if hash == "eth"}
          <Ethereum {transactionFilter} transactions={$transactions[hash]} />
        {:else}
          <Bitcoin
            {transactionFilter}
            transactions={$transactions[hash]}
            coin={hash}
          />
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .container {
    margin-top: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .row {
    margin-bottom: 20px;
    max-width: 100%;
  }

  .col-md-12 {
    padding: 0;
  }

  .form-group {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .form-control {
    width: 100%;
  }

  .form-control:focus {
    border-color: #00a8ff;

    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    -ms-box-shadow: none;
    -o-box-shadow: none;
  }

  .form-control::-webkit-input-placeholder {
    color: #ccc;
  }

  .form-control::-moz-placeholder {
    color: #ccc;
  }

  .form-control:-ms-input-placeholder {
    color: #ccc;
  }
</style>
