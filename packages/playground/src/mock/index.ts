import { mock, Random } from "mockjs";
import { ref } from "vue";

const names = new Array(10).fill(0).map((_, index) => Random.cname());

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

export function family(name: string) {
  return mock({
    "list|1-10": [
      {
        "id|+1": 1,
        family: names.filter((randomName, index) => name !== randomName),
      },
    ],
  });
}
