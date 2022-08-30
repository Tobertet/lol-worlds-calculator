import { FC } from "react";
import { LcsBracket } from "./components/LcsBracket";
import { LecBracket } from "./components/LecBracket";
import { LplBracket } from "./components/LplBracket";
import { Tabs } from "./components/Tabs";

const App: FC = () => (
  <Tabs
    tabs={[
      {
        id: "lec",
        icon: "https://am-a.akamaihd.net/image?resize=60:&f=http%3A%2F%2Fstatic.lolesports.com%2Fleagues%2F1592516184297_LEC-01-FullonDark.png",
        content: <LecBracket />,
      },
      {
        id: "lcs",
        icon: "https://am-a.akamaihd.net/image?resize=60:&f=http%3A%2F%2Fstatic.lolesports.com%2Fleagues%2FLCSNew-01-FullonDark.png",
        content: <LcsBracket />,
      },
      {
        id: "lpl",
        icon: "https://am-a.akamaihd.net/image?resize=60:&f=http%3A%2F%2Fstatic.lolesports.com%2Fleagues%2F1592516115322_LPL-01-FullonDark.png",
        content: <LplBracket />,
      },
    ]}
  />
);

export default App;
