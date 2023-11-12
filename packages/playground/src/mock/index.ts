import { mock, Random } from "mockjs";
import { ref, toRefs, unref } from "vue";

const getNames = () => new Array(10).fill(0).map((_, index) => Random.cname());
const names = getNames();

export const user = ref(
  mock({
    "list|1-10": [
      {
        "id|+1": 1,
        "name|1": names,
        "age|18-30": 1,
        "sex|1": ["男", "女"],
      },
    ],
  }).list
);

const relationship = {
  family: ["长辈", "晚辈", "兄弟姐妹", "父母", "母系亲戚", "父系亲戚"],
  company: ["经理", "组长", "前端", "后端", "人事", "UI"],
  friend: ["死党", "朋友", "基友", "闺蜜", "情敌", "情人"],
};

const buildRelationShipData = async (
  type: "family" | "company" | "friend",
  id: number
) => {
  // @ts-ignore
  const selfName = user.value.find((item) => item.id == id)?.name;
  const data = mock({
    data: {
      id,
      list: getNames()
        .filter((randomName) => selfName !== randomName)
        .map((item, index) => {
          return {
            id: index + 1,
            "name|1": item,
            "relationship|1": relationship[type],
            "age|18-30": 1,
            "sex|1": ["男", "女"],
          };
        }),
    },
  });

  return data;
};

const relationshipData: any = {
  family: null,
  company: null,
  friend: null,
};

export const getRelationship = async (
  type: "family" | "company" | "friend",
  id: number
) => {
  if (!relationshipData[type])
    relationshipData[type] = buildRelationShipData(type, id);
  return relationshipData[type];
};

export const getRelationshipDetail = async (
  type: "family" | "company" | "friend",
  sid: number
) => {
  const result = await relationshipData[type];
  // @ts-ignore
  const target = result.data.list.find((item) => item.id == sid);
  const data = mock({
    data: {
      sid,
      detail: {
        ...target,
        dynamicTagsValue: ["可可爱爱", "奇奇怪怪"],
        switchValue: true,
        relationship: [type],
      },
    },
  });

  return data;
};

export const editRelationshipDetail = async (
  type: "family" | "company" | "friend",
  sid: number,
  data: any
) => {
  
  const result = await relationshipData[type];
  Object.assign(
    result.data.list.find((item: any) => item.id == sid),
    data
  );
};
