import { FC } from "react";
import { RowItem } from "./RowItem";

type Props = {
  items: { imageUri: string; imageAlt?: string; text: string }[];
  totalColumns: number;
  labelText: string;
  labelColor: string;
};

export const TableRow: FC<Props> = ({
  items,
  totalColumns,
  labelText,
  labelColor,
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `2fr ${"1fr ".repeat(totalColumns)}`,
      alignItems: "center",
      columnGap: "1%",
      marginBlock: "1%",
    }}
  >
    <span
      style={{
        fontSize: "4vw",
        color: labelColor,
        textAlign: "end",
      }}
    >
      {labelText}.{" "}
    </span>
    {items.map((item) => (
      <RowItem {...item} />
    ))}
  </div>
);
