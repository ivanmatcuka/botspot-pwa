export type Dimension = {
  bottom: string;
  left: string;
  right: string;
  top: string;
};
export type Spacing = { margin: Dimension; padding: Dimension };
export const parseGutenbergSpacing = (spacing: Spacing) => {
  const { margin, padding } = spacing ?? {};

  return {
    mb: margin?.bottom?.split('|').pop(),
    ml: margin?.left?.split('|').pop(),
    mr: margin?.right?.split('|').pop(),
    mt: margin?.top?.split('|').pop(),
    pb: padding?.bottom?.split('|').pop(),
    pl: padding?.left?.split('|').pop(),
    pr: padding?.right?.split('|').pop(),
    pt: padding?.top?.split('|').pop(),
  };
};
