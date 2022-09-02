import { FC, ReactNode, useState } from "react";
import { ChampionshipID } from "../types";

type Props = {
  tabs: { id: ChampionshipID; icon: string; content: ReactNode }[];
};

export const Tabs: FC<Props> = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState<ChampionshipID>("lec");
  return (
    <div style={{ marginTop: "104px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          background: "#131313",
          position: "fixed",
          top: 0,
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
                selectedTab === tab.id ? "#1A76E3" : "transparent",
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