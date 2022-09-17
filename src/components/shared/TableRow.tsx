import { FC } from "react";
import { Colors } from "../../theme/colors";
import { RowItem, TableRowItem } from "./RowItem";

type Props = {
  items: TableRowItem[];
  totalColumns: number;
  labelText?: string;
  labelColor?: string;
};

export const TableRow: FC<Props> = ({
  items,
  totalColumns,
  labelText,
  labelColor = Colors.primary,
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `${labelText ? "2fr" : ""} ${"1fr ".repeat(
        totalColumns
      )}`,
      alignItems: "center",
      columnGap: "1%",
      marginBlock: "1%",
    }}
  >
    {labelText && (
      <span
        style={{
          fontSize: "4vw",
          color: labelColor,
          textAlign: "end",
        }}
      >
        {labelText}.{" "}
      </span>
    )}
    {items.map((item) => (
      <RowItem key={item.text} {...item} />
    ))}
  </div>
);
