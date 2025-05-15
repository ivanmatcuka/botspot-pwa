import { MenuItem } from '@/services';
import { getComponentBySlug } from '@/services/getComponentBySlug';
import { getMenuBySlug } from '@/services/getMenuBySlug';
import { normalizeURL } from '@/utils/normalizeURL';
import { CustomPost } from '@botspot/ui';
import { Box, Container, Grid, Typography } from '@botspot/ui';
import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';

import { GutenbergBlocks } from './GutenbergBlocks';

type TextProps = {
  href?: string;
};
const Text: FC<PropsWithChildren<TextProps>> = ({
  children,
  href,
  ...props
}) => {
  let link;

  if (href && href !== '#') {
    link = (
      <Link className="hover:underline" href={href}>
        {children}
      </Link>
    );
  }

  return (
    <Typography color="white" variant="body2" {...props}>
      {link ?? children}
    </Typography>
  );
};

type FooterMenuProps = {
  items: MenuItem[];
};
const FooterMenu: FC<FooterMenuProps> = ({ items }) => {
  const subItems = [...items];
  const main = subItems.shift();

  if (!main) return null;

  return (
    <>
      <Text href={normalizeURL(main.url)} key={main.ID}>
        {main.title}
      </Text>
      <br />
      <FooterMenuItems items={subItems} />
    </>
  );
};

type FooterMenuItemsProps = {
  items: MenuItem[];
};
const FooterMenuItems: FC<FooterMenuItemsProps> = ({ items }) =>
  items.map((item) => (
    <Text href={normalizeURL(item.url)} key={item.ID}>
      {item.title}
    </Text>
  ));

type FooterProps = {
  products: CustomPost[];
};
export const Footer: FC<FooterProps> = async ({ products }) => {
  const [
    resourcesLinks,
    companyLinks,
    submenuLinks,
    productsLink,
    footer,
    subfooter,
  ] = await Promise.all([
    getMenuBySlug('footer-resources'),
    getMenuBySlug('footer-company'),
    getMenuBySlug('footer-submenu'),
    getMenuBySlug('footer-products'),
    getComponentBySlug('footer-contacts'),
    getComponentBySlug('subfooter'),
  ]);

  const footerContactsBlocks = footer?.block_data;
  const subfooterBlocks = subfooter?.block_data;

  return (
    <>
      <footer className="bg-info-main">
        <Container maxWidth="xl">
          <Grid md={10} mx="auto" py={8} xs={12} container>
            <Grid flexBasis={{ md: '40%', xs: '100%' }} item>
              {footerContactsBlocks && (
                <GutenbergBlocks blocks={footerContactsBlocks} />
              )}
            </Grid>
            <Grid
              flexBasis={{ md: '20%', xs: '100%' }}
              mt={{ md: 9.25, xs: 5 }}
              pr={2}
              item
            >
              <FooterMenuItems items={productsLink} />
              <br />
              {products.map((product, index) => (
                <Text href={`/products/${product.slug}`} key={index}>
                  {product?.acf?.['full-name'] || product.title.rendered}
                </Text>
              ))}
            </Grid>
            <Grid
              flexBasis={{ md: '20%', xs: '100%' }}
              mt={{ md: 9.25, xs: 5 }}
              item
            >
              <FooterMenu items={resourcesLinks} />
            </Grid>
            <Grid
              flexBasis={{ md: '20%', xs: '100%' }}
              mt={{ md: 9.25, xs: 5 }}
              item
            >
              <FooterMenu items={companyLinks} />
            </Grid>
          </Grid>
        </Container>
      </footer>
      <footer className="bg-common-black">
        <Grid maxWidth="xl" mx="auto" py={3} container>
          <Grid
            alignItems={{ md: 'flex-end', xs: 'center' }}
            display="flex"
            flexBasis="100%"
            flexDirection={{ md: 'row', xs: 'column' }}
            gap={3}
            justifyContent={{ md: 'space-between', xs: 'center' }}
            md={10}
            mx="auto"
            xs={12}
            item
          >
            {subfooterBlocks && <GutenbergBlocks blocks={subfooterBlocks} />}
            <Box
              display="flex"
              flexDirection={{ md: 'row', xs: 'column' }}
              gap={3}
              textAlign="center"
            >
              <FooterMenuItems items={submenuLinks} />
            </Box>
          </Grid>
        </Grid>
      </footer>
    </>
  );
};
