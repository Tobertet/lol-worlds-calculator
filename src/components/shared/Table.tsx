import { FC, ReactElement } from "react";
import { TableRow } from "./TableRow";

type Props = {
  rows: {
    items: { imageUri: string; imageAlt?: string; text: string }[];
    labelText: string;
    labelColor: string;
  }[];
  caption?: ReactElement;
  totalColumns: number;
};

export const Table: FC<Props> = ({ rows, totalColumns, caption }) => (
  <div>
    {rows.map((row) => (
      <TableRow {...row} totalColumns={totalColumns} />
    ))}
    {caption}
  </div>
);
