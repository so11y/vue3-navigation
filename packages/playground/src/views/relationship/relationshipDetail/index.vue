<template>
  <n-space vertical>
    <div class="title">
      <n-switch v-model:value="updateDisabled" /> 编辑开关
    </div>
    <span style="font-size: 12px"
      >当前页面为嵌套组件，可以查看不同嵌套层级页面之间的缓存效果</span
    >
    <n-form
      ref="formRef"
      :model="model"
      label-placement="left"
      :label-width="160"
      :disabled="!updateDisabled"
      :style="{
        maxWidth: '640px',
      }"
    >
      <n-form-item label="name" path="name">
        <n-input v-model:value="model.name" placeholder="姓名" />
      </n-form-item>
      <n-form-item label="sex" path="sexValue">
        <n-select
          v-model:value="model.sex"
          placeholder="Select"
          :options="generalOptions"
        />
      </n-form-item>
      <n-form-item label="age" path="sliderValue">
        <n-slider v-model:value="model.age" :step="5" />
      </n-form-item>
      <n-form-item label="character Tags" path="dynamicTagsValue">
        <n-dynamic-tags v-model:value="model.dynamicTagsValue" />
      </n-form-item>
      <n-form-item label="emergency" path="switchValue">
        <n-switch v-model:value="model.switchValue" />
      </n-form-item>
      <n-form-item label="relationship" path="relationship">
        <n-checkbox-group v-model:value="model.relationship">
          <n-space>
            <n-checkbox value="company"> company </n-checkbox>
            <n-checkbox value="family"> family </n-checkbox>
            <n-checkbox value="friend"> friend </n-checkbox>
          </n-space>
        </n-checkbox-group>
      </n-form-item>
      <n-form-item label="color Picker" path="colorValue">
        <n-color-picker v-model:value="model.colorValue" />
      </n-form-item>
      <n-form-item label=" ">
        <n-button attr-type="button" @click="router.back()"> 后退 </n-button>
        <n-button
          attr-type="button"
          :disabled="!updateDisabled"
          @click="handleCilck"
        >
          编辑
        </n-button>
      </n-form-item>
    </n-form>
  </n-space>
</template>

<script lang="ts" setup>
import { ref, onMounted, onActivated } from "vue";
import {
  NSpace,
  NSwitch,
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NDynamicTags,
  NCheckbox,
  NCheckboxGroup,
  NColorPicker,
  NSlider,
  NButton,
  useNotification,
} from "naive-ui";
import { getRelationshipDetail, editRelationshipDetail } from "../../../mock";
import { useRoute, useRouter } from "vue3-navigation";

defineOptions({
  name: "relationshipDetail",
});
const route = useRoute();
const router = useRouter();
const notification = useNotification();
const formRef = ref(null);

const updateDisabled = ref(false);
const model = ref({
  name: null,
  sex: null,
  dynamicTagsValue: [],
  datetimeValue: null,
  switchValue: false,
  relationship: [],
  colorValue: "#2106EEFF",
  age: 0,
});

const generalOptions = ref(
  ["男", "女"].map((v) => ({
    label: v,
    value: v,
  }))
);

onMounted(async () => {
  const { query } = route;
  if (query.sid) {
    const { data } = await getRelationshipDetail(query.type, query.sid);
    model.value = data.detail;
  }
  notification.success({
    content: "当前界面是新渲染",
    meta: "",
    duration: 2500,
    keepAliveOnHover: true,
  });
  notification.success({
    content:
      "可编辑后查看列表的更新，或尝试在编辑状态中切换其他页面，回退查看缓存状态",
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

const handleCilck = async () => {
  // updateDisabled.value = !updateDisabled.value;
  const { query } = route;
  await editRelationshipDetail(query.type, query.sid, { ...model.value });
  router.replace({
    path: `/user/address-book/${query.type}`,
    query: {
      id: query.fid,
    },
  });
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
}
:deep(.n-switch) {
  margin-right: 10px;
}
</style>
