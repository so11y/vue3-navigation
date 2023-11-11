<template>
  <n-row :gutter="8">
    <n-col :span="12">
      <n-input placeholder="过滤文本后进行界面跳转查看缓存状态" v-model:value="filterInput" />
    </n-col>
    <n-col>
      <n-button @click="handleFilter">搜索</n-button>
    </n-col>
  </n-row>
  <n-data-table
    ref="tableRef"
    :columns="columns"
    :data="data"
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
      title: "No",
      key: "no",
    },
    {
      title: "Title",
      key: "title",
      filter(value, row) {
        return row.title.indexOf(value.toString()) > -1;
      },
    },
    {
      title: "Length",
      key: "length",
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

const data: Song[] = [
  { no: 3, title: "Wonderwall", length: "4:18" },
  { no: 4, title: "London", length: "4:48" },
  { no: 12, title: "Champagne Supernova", length: "7:27" },
];
function handleFilter() {
  tableRef.value!.filter({
    title: [filterInput.value],
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
