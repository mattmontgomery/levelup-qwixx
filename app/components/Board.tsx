import React, { StyleHTMLAttributes } from "react";

const COLORS: Game.Colors[] = ["red", "yellow", "green", "blue"];

export default function Board({
  board,
  eligible,
  onSelectNumber,
}: {
  board: Game.Board;
  eligible: Game.Die;
  onSelectNumber: (number: number, color: Game.Colors) => void;
}): React.ReactElement {
  return (
    <div>
      {COLORS.map((color, idx) => (
        <div
          key={idx}
          style={{
            padding: "1rem",
            display: "grid",
            gridTemplateColumns: `repeat(12, 1fr)`,
            gridColumnGap: "1rem",
            backgroundColor:
              {
                red: "#ff6666",
                blue: "#6666ff",
                green: "green",
                yellow: "yellow",
              }[color] ?? color,
          }}
        >
          {board?.[color]?.map((cell, idx) => {
            const isChecked =
              board[color].find((cell) => cell.number === eligible.number)
                ?.checked === true;
            const afterIsChecked = board[color]
              .slice(
                board[color].findIndex(
                  (cell) => cell.number === eligible.number
                ) + 1
              )
              .some((cell) => cell.checked === true);
            const isSelectedNumber =
              cell.number === eligible.number && color === eligible.color;
            const isEligible =
              isSelectedNumber && !isChecked && !afterIsChecked;
            isSelectedNumber &&
              console.log({
                isSelectedNumber,
                isChecked,
                afterIsChecked,
                isEligible,
              });
            return (
              <span
                key={idx}
                style={{
                  cursor: isEligible ? "pointer" : "not-allowed",
                }}
                onClick={
                  isEligible
                    ? () => onSelectNumber(cell.number, color)
                    : () => {}
                }
              >
                <Cell {...cell} eligible={isEligible} />
              </span>
            );
          })}
          <CellWrapper>{"🔒"}</CellWrapper>
        </div>
      ))}
    </div>
  );
}

function Cell({
  number,
  eligible,
  checked,
}: {
  number: number;
  eligible: boolean;
  checked: boolean;
}): React.ReactElement {
  return (
    <CellWrapper
      style={{
        backgroundColor: eligible ? "darkgray" : checked ? "orange" : "white",
        color: eligible ? "white" : "black",
        border: "2px solid black",
      }}
    >
      {number}
    </CellWrapper>
  );
}

function CellWrapper({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: StyleHTMLAttributes<HTMLDivElement>["style"];
}) {
  return (
    <div
      style={{
        ...style,
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <span style={{ zIndex: 1, fontSize: "24px", fontWeight: "bold" }}>
        {children}
      </span>
    </div>
  );
}
