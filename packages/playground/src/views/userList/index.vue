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

<script setup lang="ts">
import { onActivated, onMounted, ref } from "vue";
import {
  NButton,
  NDataTable,
  NRow,
  NCol,
  NInput,
  DataTableInst,
  NButtonGroup,
  useNotification,
} from "naive-ui";
import { user as userData } from "../../mock";
import { createColumns, User } from "./helper";
import { useRouter } from "vue3-navigation";

defineOptions({
  name: "userList",
});
const notification = useNotification();
const router = useRouter();
const filterInput = ref("");
const tableRef = ref<DataTableInst>();

const columns = ref(
  createColumns({
    select(key,row) {
      router.push(`/user/address-book/${key}?id=${row.id}`);
    },
    edit(row: User) {
      router.push(`/user/operate-user?id=${row.id}`);
    },
  })
);
onActivated(() => {
  notification.success({
    content: "当前列表界面是已缓存",
    meta: "",
    duration: 2500,
    keepAliveOnHover: true,
  });
});

onMounted(() => {
  notification.success({
    content: "当前界面是新渲染",
    meta: "",
    duration: 2500,
    keepAliveOnHover: true,
  });
});

function handleFilter() {
  tableRef.value!.filter({
    name: [filterInput.value],
  });
}
function handleCreate() {
  router.push("/user/operate-user");
}
</script>
