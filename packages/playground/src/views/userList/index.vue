<template>
  <n-row :gutter="8">
    <n-col :span="12">
      <n-input
        placeholder="过滤文本后进行界面跳转查看缓存状态"
        v-model:value="filterInput"
      />
    </n-col>
    <n-col>
      <n-button-group>
        <n-button @click="handleFilter">搜索</n-button>
        <n-button @click="handleCreate">新增</n-button>
      </n-button-group>
    </n-col>
  </n-row>
  <n-data-table
    ref="tableRef"
    :columns="columns"
    :data="userData"
    :bordered="false"
  />
</template>

<script setup lang="tsx">
import { ref } from "vue";
import {
  NButton,
  useMessage,
  NDataTable,
  NRow,
  NCol,
  NInput,
  DataTableInst,
  NButtonGroup,
} from "naive-ui";
import { user as userData } from "../../mock";
import { createColumns, Song } from "./helper";
import { useRouter } from "vue3-navigation";

defineOptions({
  name: "userList",
});
const router = useRouter();
const filterInput = ref("");
const tableRef = ref<DataTableInst>();

const message = useMessage();
const columns = ref(
  createColumns({
    play(row: Song) {
      message.info(`Play ${row.name}`);
    },
  })
);

function handleFilter() {
  tableRef.value!.filter({
    name: [filterInput.value],
  });
}
function handleCreate() {
  router.push("/user/operate-user");
}
</script>
