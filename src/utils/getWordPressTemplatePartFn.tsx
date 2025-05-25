import { TemplatePart } from '@/components/wordpress/TemplatePart';

export const getWordPressTemplatePartFn = (slug: string) => {
  return function BlocksFunction() {
    return <TemplatePart slug={slug} />;
  };
};
