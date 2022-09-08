import { FC } from "react";

type Props = {
  imageUri: string;
  imageAlt?: string;
  text: string;
};

export const RowItem: FC<Props> = ({ imageUri, imageAlt, text }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      padding: "0 4%",
      minWidth: "10%",
      alignItems: "center",
      height: "100%",
    }}
  >
    <img
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
      src={imageUri}
      alt={imageAlt}
    />
    <span style={{ fontSize: "1vw", textAlign: "center", color: "#eee" }}>
      {text}
    </span>
  </div>
);
