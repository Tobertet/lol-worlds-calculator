import { FC } from "react";
import { Team } from "../types";
import { getTeam, toPercentage } from "../utils/functions";

type Props = {
  position: number | string;
  results: { seed: number; probability: number }[];
  teams: Team[];
};

const numberColors: { [index: number | string]: string } = {
  1: "#DEC43E",
  2: "#a7a59a",
  3: "#bb5b09",
  RQ: "#bb5b09",
};

export const Position: FC<Props> = ({ teams, position, results }) => {
  return (
    <p
      style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ",
        alignItems: "center",
        columnGap: "1%",
      }}
    >
      <span
        style={{
          fontSize: "4vw",
          color: numberColors[position],
          textAlign: "end",
        }}
      >
        {position}.{" "}
      </span>
      {results.map((result) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 4%",
            minWidth: "10%",
            alignItems: "center",
          }}
        >
          <img
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
            src={getTeam(teams, result.seed)?.icon}
            alt="asd"
          />
          <span style={{ fontSize: "1vw", textAlign: "center" }}>
            {toPercentage(result.probability)}
          </span>
        </div>
      ))}
    </p>
  );
};
