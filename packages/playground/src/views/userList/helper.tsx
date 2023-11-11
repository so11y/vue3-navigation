import { DataTableColumns, NButton } from "naive-ui";

export type Song = {
  id: number;
  name: string;
  age: number;
  sex: string;
};

export const createColumns = ({
  edit,
}: {
  edit: (row: Song) => void;
}): DataTableColumns<Song> => {
  return [
    {
      title: "id",
      key: "id",
    },
    {
      title: "name",
      key: "name",
      filter(value, row) {
        return row.name.indexOf(value.toString()) > -1;
      },
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
          <NButton strong tertiary size="small" onClick={() => edit(row)}>
            编辑
          </NButton>
        );
      },
    },
  ];
};
