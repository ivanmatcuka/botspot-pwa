import { FC, PropsWithChildren } from 'react';

import { useTemplateParts } from './TemplatePartsProvider';

type TemplatePartClientProps = {
  slug: string;
};
export const TemplatePart: FC<PropsWithChildren<TemplatePartClientProps>> = ({
  slug,
}) => {
  const templateParts = useTemplateParts();

  return templateParts[slug];
};
