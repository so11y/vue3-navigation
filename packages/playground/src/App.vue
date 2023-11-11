<script setup lang="ts">
import { NavigateView } from "vue3-navigation";
import { NMessageProvider, NNotificationProvider } from "naive-ui";

defineOptions({
  name: "App",
});
</script>

<template>
  <NNotificationProvider>
    <NMessageProvider>
      <NavigateView name="App" :exclude="['login']"/>
    </NMessageProvider>
  </NNotificationProvider>
</template>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
</style>
