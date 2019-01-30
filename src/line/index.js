import { Line } from "@dljsbook/data";

const line = new Line()

const {
  data, // an array of x points
  labels, // an array of y points
  print // a function to print a line chart to tfjs-vis
} = line.get()

print()
