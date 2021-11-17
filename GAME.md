## Carryover from dry run

- Die component
- Basic CSS framing
- Countdown element
- Types

## Build in presentation

1. Game state
2. Rolling the dice
3. Event Emitter

```ts
useEffect(() => {
  Pusher.logToConsole = true;
  if (!process.env.NEXT_PUBLIC_PUSHER_APP_KEY) {
    return;
  }
  var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
    cluster: "us3",
  });

  var channel = pusher.subscribe("qwixx");
  channel.bind("roll", ({ message }: { message: Game.Dice }) => {
    setDice(message);
    setSelectedDice([]);
  });
}, [emitter]);
```

```ts
useEffect(() => {
  setGame(Game.init(emitter));
}, [emitter]);
useEffect(() => {
  const onBoardChange = (board: Game.Board) => {
    setBoard(board);
  };
  emitter.on("board", onBoardChange);
  return () => {
    emitter.off("board", onBoardChange);
  };
}, [emitter]);
```
