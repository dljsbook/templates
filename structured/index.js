import { BostonHousing } from "@dljsbook/data"
const house = new BostonHousing()
house.ready(() => {
  const {
    data,
    labels,
    print
  } = house.get("train")
  print()
})
