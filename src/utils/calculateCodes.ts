import { CodeProps } from "../App";
import { dataObject } from "./codeList";

export const calculateCodes = (codes: CodeProps[]) => {
  let results: CodeProps[] = [];
  codes.forEach((code) => {
    results.push({
      ...code,
      value: dataObject[code.size][2],
    });
  });

  results.sort((a, b) => b.value! - a.value!);

  results.forEach((code, idx) => {
    const multiplier = idx === 0 ? 1 : idx === 1 ? 0.7 : 0.5;

    code.multiplier = multiplier;
  });

  return results;
};
