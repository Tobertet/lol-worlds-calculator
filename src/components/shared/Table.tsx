import { FC, ReactElement } from "react";
import { Colors } from "../../theme/colors";
import { TableRowItem } from "./RowItem";
import { TableRow } from "./TableRow";

type Props = {
  rows: {
    items: TableRowItem[];
    labelText?: string;
    labelColor?: string;
  }[];
  caption?: ReactElement;
  totalColumns: number;
  title?: string;
};

export const Table: FC<Props> = ({ rows, totalColumns, caption, title }) => (
  <div>
    {title && (
      <h3
        style={{
          color: Colors.white,
          textAlign: "start",
          fontSize: "1.4vw",
          marginTop: "unset",
        }}
      >
        {title}
      </h3>
    )}
    {rows.map((row, index) => (
      <TableRow key={index} {...row} totalColumns={totalColumns} />
    ))}
    {caption}
  </div>
);
