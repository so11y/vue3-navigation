<script setup lang="ts">
import { ref } from "vue";
import { useKeepAliveViews, useRouter, RouterView } from "vue3-navigation";

const routerName = ref("");

const views = useKeepAliveViews();

const { push } = useRouter();

function pushRouter() {
  console.log("----F");
  push(routerName.value);
  routerName.value = "";
}
</script>

<template>
  cache:{{ views }}
  <br />
  <RouterView />

  <hr />
  <br />
  <input type="text" v-model="routerName" @keydown.enter="pushRouter" />
</template>
