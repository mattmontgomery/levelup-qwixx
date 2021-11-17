export default function Die({
  color,
  number,
  selected = false,
  clickable = true,
  onClick,
}: {
  color: Game.Colors;
  number: number;
  selected: boolean;
  clickable: boolean;
  onClick: React.EventHandler<React.MouseEvent>;
}): React.ReactElement {
  return (
    <div
      onClick={clickable ? onClick : () => {}}
      style={{
        cursor: clickable ? "pointer" : "not-allowed",
        width: 50,
        height: 50,
        backgroundColor:
          {
            red: "#ff6666",
            blue: "#6666ff",
            green: "green",
            yellow: "yellow",
          }[color] ?? color,
        border: `2px solid ${clickable ? "black" : "darkgrey"}`,
        color: clickable ? "black" : selected ? "#900" : "grey",
        fontSize: "24px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
      }}
    >
      {number}
    </div>
  );
}
