import { FC } from "react";
import {
  groupATeams,
  groupBTeams,
  groupCTeams,
  groupDTeams,
} from "../championships/worlds/teams";
import { PlayInGroupLeague } from "./PlayInGroupLeague";

export const Worlds: FC = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "32px 5%",
      margin: "64px 5%",
    }}
  >
    <PlayInGroupLeague name="A" teams={groupATeams} />
    <PlayInGroupLeague name="B" teams={groupBTeams} />
    <PlayInGroupLeague name="C" teams={groupCTeams} />
    <PlayInGroupLeague name="D" teams={groupDTeams} />
  </div>
);
