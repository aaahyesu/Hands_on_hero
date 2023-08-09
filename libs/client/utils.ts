export function cls(...classnames: string[]) {
  return classnames.join(" ");
}

export const combineClassNames = (...classnames: string[]) =>
  classnames.join(" ");

// 금액에 구분자 넣어주는 헬퍼함수
export const priceWithCommas = (price: number | null | undefined) =>
  typeof price === "number"
    ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : 0;
