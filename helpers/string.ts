import { pascalCase } from "es-toolkit/string";

/**
 * 문장을 빈칸 유지한 채로 파스칼 케이스로 전환
 * @param sentence
 */
export const keepBlankToPascalCase = (sentence): string => {
  return sentence
    .split(" ")
    .map((word) => pascalCase(word))
    .join(" ");
};
