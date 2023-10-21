import { CodeProps } from "../App";
import { dataObject } from "./codeList";

export const calculateCodes = (codes: CodeProps[]) => {
  let total: number = 0;
  let values: number[] = [];
  codes.forEach((code) => {
    values.push(dataObject[code.size][2]);
  });

  values.sort((a, b) => a - b);

  values.forEach((value, idx) => {
    const multiplier = idx === 0 ? 1 : idx === 1 ? 0.7 : 0.5;

    total += value * multiplier;
  });

  console.log("total > ", total);
  return parseFloat(total.toFixed(2));
};
