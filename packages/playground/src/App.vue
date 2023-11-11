<script setup lang="ts">
import { NavigateView } from "vue3-navigation";
import { NMessageProvider } from "naive-ui";

defineOptions({
  name: "App",
});
</script>

<template>
  <NMessageProvider>
    <NavigateView name="App" />
  </NMessageProvider>
</template>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
</style>
