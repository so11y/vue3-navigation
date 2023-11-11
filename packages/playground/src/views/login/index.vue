<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue3-navigation";
import { NInput, NButton } from "naive-ui";
defineOptions({
  name: "login",
});

const router = useRouter();

const username = ref("");
const password = ref("");

function login() {
  console.log("---")
  if (username.value === "admin" && password.value === "123456") {
    router.push("/user/userList");
  }
}
</script>

<template>
  <div class="login">
    <div class="login__title">Login</div>
    <div class="login__form">
      <NInput v-model:value="username" type="text" placeholder="username" />
      <NInput v-model:value="password" type="password" placeholder="password" />
      <NButton @click="login">Login</NButton>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .login__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .login__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .n-input {
      margin-bottom: 10px;
      width: 200px;
    }
    button {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      width: 200px;
    }
  }
}
</style>
