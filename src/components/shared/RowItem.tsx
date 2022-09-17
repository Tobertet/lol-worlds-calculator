import { FC } from "react";
import { Colors } from "../../theme/colors";

export type TableRowItem = {
  imageUri: string;
  imageAlt?: string;
  text: string;
  onClick?: () => void;
  highlight?: boolean;
  disabled?: boolean;
};

type Props = TableRowItem;

export const RowItem: FC<Props> = ({
  imageUri,
  imageAlt,
  text,
  onClick,
  highlight = false,
  disabled = false,
}) => (
  <div
    onClick={() => {
      if (!disabled && onClick) onClick();
    }}
    style={{
      display: "flex",
      flexDirection: "column",
      padding: "0 4%",
      minWidth: "10%",
      alignItems: "center",
      height: "100%",
      cursor: disabled ? "not-allowed" : onClick ? "pointer" : "default",
      opacity: disabled ? 0.2 : 1,
    }}
  >
    <img
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
      src={imageUri}
      alt={imageAlt}
    />
    <span
      style={{
        fontSize: "1vw",
        textAlign: "center",
        color: highlight ? Colors.primary : Colors.white,
        fontWeight: highlight ? "bold" : "normal",
      }}
    >
      {text}
    </span>
  </div>
);
