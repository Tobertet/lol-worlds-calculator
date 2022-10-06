import { FC, ReactNode, useState } from "react";
import { Colors } from "../theme/colors";
import { ChampionshipID } from "../types";
import "./Tabs.css";

type Props = {
  tabs: { id: ChampionshipID; icon: string; content: ReactNode }[];
  initialTab?: ChampionshipID
};

export const Tabs: FC<Props> = ({ tabs, initialTab = "worlds" }) => {
  const [selectedTab, setSelectedTab] = useState<ChampionshipID>(initialTab);

  return (
    <div className="margin">
      <div
        className="tabs"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          background: Colors.black,
          position: "fixed",
          width: "100%",
          zIndex: 1,
        }}
      >
        {tabs.map((tab) => (
          <div
            style={{
              cursor: "pointer",
              color: "white",
              borderBottomWidth: 4,
              borderBottomStyle: "solid",
              borderBottomColor:
                selectedTab === tab.id ? Colors.primary : "transparent",
              display: "flex",
              flexDirection: "column",
              padding: "8px 16px",
              alignItems: "center",
              fontSize: "20px",
            }}
            key={tab.id}
            onClick={() => {
              setSelectedTab(tab.id);
            }}
          >
            <img src={tab.icon} alt="asd" />
            {tab.id.toUpperCase()}
          </div>
        ))}
      </div>
      {tabs.find((tab) => tab.id === selectedTab)?.content}
    </div>
  );
};
