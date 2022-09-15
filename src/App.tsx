import { FC } from "react";
import { LckBracket } from "./components/LckBracket";
import { LcsBracket } from "./components/LcsBracket";
import { LecBracket } from "./components/LecBracket";
import { LplBracket } from "./components/LplBracket";
import { Tabs } from "./components/Tabs";
import { Worlds } from "./components/Worlds";

const App: FC = () => (
  <>
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
        {
          id: "lck",
          icon: "https://am-a.akamaihd.net/image?resize=60:&f=http%3A%2F%2Fstatic.lolesports.com%2Fleagues%2Flck-color-on-black.png",
          content: <LckBracket />,
        },
        {
          id: "worlds",
          icon: "https://am-a.akamaihd.net/image?resize=60:&f=http%3A%2F%2Fstatic.lolesports.com%2Fleagues%2F1592594612171_WorldsDarkBG.png",
          content: <Worlds />,
        },
      ]}
    />
    <div style={{ marginBottom: "100px" }}>
      <h3
        style={{
          color: "#eee",
          fontSize: "1vw",
          fontWeight: 400,
          textAlign: "center",
        }}
      >
        Developed by{" "}
        <a
          href="https://robertmengual.com/"
          target="_blank"
          rel="noreferrer"
          style={{ color: "white" }}
        >
          Robert Mengual
        </a>
      </h3>
      <h3
        style={{
          color: "#eee",
          fontSize: "1vw",
          fontWeight: 400,
          textAlign: "center",
        }}
      >
        Find the source code on{" "}
        <a
          href="https://github.com/Tobertet/lol-worlds-calculator"
          target="_blank"
          rel="noreferrer"
          style={{ color: "white" }}
        >
          GitHub
        </a>
      </h3>
    </div>
  </>
);

export default App;
