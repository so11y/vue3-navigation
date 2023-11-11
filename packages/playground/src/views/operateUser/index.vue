<script lang="ts" setup>
import {
  FormInst,
  NButton,
  NFormItem,
  NInput,
  NForm,
  NRadioGroup,
  NRadio,
  NSpace,
} from "naive-ui";
import { ref } from "vue";
import { user } from "../../mock";
import { useRouter } from "vue3-navigation";
defineOptions({
  name: "operateUser",
});
const router = useRouter();
const rules = {
  name: {
    required: true,
    message: "请输入姓名",
    trigger: "blur",
  },
  age: {
    required: true,
    message: "请输入年龄",
    trigger: "blur",
  },
  sex: {
    required: true,
    message: "请选择性别",
    trigger: ["input"],
  },
};
const formRef = ref<FormInst | null>(null);
const formValue = ref({
  name: "",
  age: "",
  sex: "",
});

function handleValidateClick(e: MouseEvent) {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    user.value.push({
      id: user.value.length + 1,
      ...formValue.value,
    });
    router.replace("/user/userList");
  });
}
</script>
<template>
  <div class="operate">
    <n-form
      ref="formRef"
      :label-width="80"
      :model="formValue"
      :rules="rules"
      size="small"
    >
      <n-form-item label="姓名" path="name">
        <n-input v-model:value="formValue.name" placeholder="输入姓名" />
      </n-form-item>
      <n-form-item label="年龄" path="age">
        <n-input v-model:value="formValue.age" placeholder="输入年龄" />
      </n-form-item>
      <n-form-item label="性别" path="sex">
        <n-radio-group v-model:value="formValue.sex">
          <n-space>
            <n-radio key="男" value="男"> 男 </n-radio>
            <n-radio key="女" value="女"> 女 </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item>
        <n-button attr-type="button" @click="router.back()">
          后退
        </n-button>
        <n-button attr-type="button" @click="handleValidateClick">
          新增
        </n-button>
      </n-form-item>
    </n-form>
  </div>
</template>
<style lang="scss" scoped>
.operate {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
