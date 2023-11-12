<template>
  <div>
    <n-data-table :bordered="false" :columns="columns" :data="tableData" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onActivated } from "vue";
import { createColumns, RowData } from "./helper";
import { getRelationship } from "../../../mock";
import { NDataTable, useNotification } from "naive-ui";
import { useRoute, useRouter } from "vue3-navigation";

const route = useRoute();
const router = useRouter();
const notification = useNotification();

defineOptions({
  name: "relationshipList",
});

const tableData = ref<any[]>([]);
const columns = ref(
  createColumns({
    edit(row: RowData) {
      const { query, name } = route;
      router.push(
        `/user/address-book/relationshipDetail?fid=${query.id}&sid=${row.id}&type=${name}`
      );
    },
  })
);

onMounted(async () => {
  const { query, name } = route;
  if (query.id) {
    const { data } = await getRelationship(name, query.id);
    tableData.value = data.list;
  }

  notification.success({
    content: "当前界面是新渲染",
    meta: "",
    duration: 2500,
    keepAliveOnHover: true,
  });
});

onActivated(() => {
  notification.success({
    content: "当前列表界面是已缓存",
    meta: "",
    duration: 2500,
    keepAliveOnHover: true,
  });
});
</script>
