<template>
  <n-row :gutter="8">
    <n-col :span="12">
      <n-input
        placeholder="过滤文本后进行界面跳转查看缓存状态"
        v-model:value="filterInput"
      />
    </n-col>
    <n-col>
      <n-button @click="handleFilter">搜索</n-button>
    </n-col>
  </n-row>
  <n-data-table
    ref="tableRef"
    :columns="columns"
    :data="user.list"
    :bordered="false"
  />
</template>

<script setup lang="ts">
import { h, ref } from "vue";
import {
  NButton,
  useMessage,
  NDataTable,
  NRow,
  NCol,
  NInput,
  DataTableInst,
} from "naive-ui";
import type { DataTableColumns } from "naive-ui";
import { user } from "../../mock";

console.log(user);
defineOptions({
  name: "userList",
});
const filterInput = ref("");
const tableRef = ref<DataTableInst>();

type Song = {
  no: number;
  title: string;
  length: string;
};

const createColumns = ({
  play,
}: {
  play: (row: Song) => void;
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
        return row.title.indexOf(value.toString()) > -1;
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
        return h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => play(row),
          },
          { default: () => "Play" }
        );
      },
    },
  ];
};

function handleFilter() {
  tableRef.value!.filter({
    name: [filterInput.value],
  });
}

const message = useMessage();
const columns = ref(
  createColumns({
    play(row: Song) {
      message.info(`Play ${row.title}`);
    },
  })
);
</script>
