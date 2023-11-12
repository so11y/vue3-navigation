import { DataTableColumns, NButton } from "naive-ui";

export type RowData = {
  id: number;
  name: string;
  relationship: string;
  age: number;
  sex: string;
};

export const createColumns = ({
  edit,
}: {
  edit: (row: RowData) => void;
}): DataTableColumns<RowData> => {
  return [
    {
      title: "id",
      key: "id",
    },
    {
      title: "name",
      key: "name",
    },
    {
      title: "relationship",
      key: "relationship",
    },
    {
      title: "age",
      key: "age",
    },
    {
      title: "sex",
      key: "sex",
    },
    {
      title: "Action",
      key: "actions",
      render(row) {
        return (
          <NButton type="primary" strong  size="small" onClick={() => edit(row)}>
            详情
          </NButton>
        );
      },
    },
  ];
};
