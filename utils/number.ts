export const formatNumber = (figure: number): string => {
  return new Intl.NumberFormat().format(figure)
}
