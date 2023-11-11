import { mock, Random } from "mockjs";

const names = new Array(10).fill(0).map((_, index) => Random.cname());

export const user = mock({
  "list|1-10": [
    {
      "id|+1": 1,
      "name|1": names,
      "age|18-30": 1,
      "sex|1": ["男", "女"],
    },
  ],
});

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
