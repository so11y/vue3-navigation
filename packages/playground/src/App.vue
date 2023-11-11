<script setup lang="ts">
import { NavigateView } from "vue3-navigation";

defineOptions({
  name: "App",
});
</script>

<template>
  <NavigateView name="App" :exclude="['login']"/>
</template>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
</style>
