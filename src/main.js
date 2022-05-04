import { writable } from "svelte/store";
import App from "./App.svelte";

const supportedCoins = ["eth", "btc", "ltc"];

const transactions = writable(
  supportedCoins.reduce((acc, coin) => {
    return { ...acc, [coin]: [] };
  }, {})
);

let command = {
  coin: "eth",
  command: "subscribe",
  entity: "pending_transaction",
};

const websocket = new WebSocket("wss://ws.blockchain.info/coins");

supportedCoins.forEach((coin) => {
  websocket.addEventListener("open", () => {
    const coinCommand = { ...command, coin };
    websocket.send(JSON.stringify(coinCommand));

    websocket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
	//   console.log(data);
      if (data.coin === coin && data.message !== "subscribed") {
        transactions.update((trns) => {
          const coinTransactions = trns[coin];
          const newTransactions = [...coinTransactions, data];
          return { ...trns, [coin]: newTransactions };
        });
      }
    });

    websocket.addEventListener("close", () => {
      console.log("closed");
    });
  });
});

const app = new App({
  target: document.body,
  props: {
    transactions,
  },
});

export default app;
