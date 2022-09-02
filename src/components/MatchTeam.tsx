import { FC } from "react";
import { ProcessedTeam } from "../types";
import { toPercentage } from "../utils/functions";

type Props = {
  team: ProcessedTeam;
  onSelect?: () => void;
  selected?: boolean;
};

export const MatchTeam: FC<Props> = ({ team, onSelect, selected }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      maxHeight: "40%",
      minHeight: "40%",
      padding: "4%",
      cursor: team.name === "TBD" ? "not-allowed" : "pointer",
      borderLeft: `3px solid ${selected ? "#1A76E3" : "transparent"}`,
    }}
    onClick={() => {
      if (team.name !== "TBD" && onSelect) {
        onSelect();
      }
    }}
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "30% 1fr",
        height: "100%",
        width: "100%",
        alignItems: "center",
        gap: "4%",
      }}
    >
      <img
        src={team.icon}
        alt="asd"
        style={{
          width: "100%",
          height: "auto",
          objectFit: "contain",
        }}
      />
      <span
        style={{
          color: team.name === "TBD" ? "gray" : "#fff",
          fontSize: "0.9vw",
        }}
      >
        {team.name}
      </span>
    </div>
    <p
      style={{
        margin: 0,
        color: team.percentage > 0 ? "#1A76E3" : "gray",
        fontSize: "1vw",
        fontWeight: "bold",
        minWidth: "35%",
        textAlign: "end",
      }}
    >
      {toPercentage(team.percentage)}
    </p>
  </div>
);
