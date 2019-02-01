const { BostonHousing } = dljsData
const house = new BostonHousing()
house.ready(() => {
  const {
    data,
    labels,
    print
  } = house.get("train")

  print()
})
