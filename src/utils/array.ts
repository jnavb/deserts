export const toRecord = (
  previousValue: any = {},
  currentValue: { id: string },
) => {
  previousValue[currentValue.id] = currentValue;
  return previousValue;
};
