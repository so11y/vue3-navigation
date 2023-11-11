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
  useNotification,
} from "naive-ui";
import { onMounted, ref, unref } from "vue";
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

function builderForm() {
  const hasId = router.currentRoute.value.query;
  if (hasId.id) {
    const mockSource = unref(user).find(
      (item: any) => item.id === Number(hasId.id)
    );
    return {
      ...mockSource,
      age: mockSource.age.toString(),
    };
  }
  return {
    name: "",
    age: "",
    sex: "",
  };
}
const formValue = ref(builderForm());
const notification = useNotification();
onMounted(() => {
  notification.success({
    content: "可以尝试直接浏览器回退，或者提交表单可以查看缓存状态",
    meta: "",
    duration: 2500,
    keepAliveOnHover: true,
  });
});
function handleValidateClick(e: MouseEvent) {
  e.preventDefault();
  formRef.value?.validate((errors) => {
    if (errors?.length) return;
    if (user.value.id !== undefined) {
      user.value.push({
        id: user.value.length + 1,
        ...formValue.value,
      });
    } else {
      Object.assign(
        user.value.find(
          (item: any) => item.id === Number(router.currentRoute.value.query.id)
        ),
        formValue.value
      );
    }
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
        <n-button attr-type="button" @click="router.back()"> 后退 </n-button>
        <n-button attr-type="button" @click="handleValidateClick">
          {{ formValue.id ? "编辑" : "新增" }}
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
