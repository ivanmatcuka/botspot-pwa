import { Attrs } from '@/services';

export const parseGutenbergSpacing = (
  spacing: NonNullable<Attrs['style']>['spacing'],
) => {
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
