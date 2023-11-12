import { DataTableColumns, NButton, NDropdown, NSpace } from "naive-ui";

const operates = [
  {
    label: "家庭",
    key: "family",
  },
  {
    label: "公司",
    key: "company",
  },
  {
    label: "朋友",
    key: "friend",
  },
];

export type User = {
  id: number;
  name: string;
  age: number;
  sex: string;
};

export const createColumns = ({
  edit,
  select,
}: {
  edit: (row: User) => void;
  select: (key:string,row: User) => void;
}): DataTableColumns<User> => {
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
          <NSpace>
            <NButton onClick={() => edit(row)}>编辑</NButton>
            <NDropdown
              onSelect={(key: string) => select(key, row)}
              options={operates}
            >
              <NButton>关系列表</NButton>
            </NDropdown>
          </NSpace>
        );
      },
    },
  ];
};
