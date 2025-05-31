'use client';

import { Attrs } from '@/services';
import { attrsToMuiProps } from '@/utils/attrsToMuiProps';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

export type CoreImageProps = {
  alt?: string;
  aspectRatio?: string;
  linkClass?: string;
  linkTarget?: string;
  title?: string;
  url: string;
} & Attrs;

export const CoreImage: FC<CoreImageProps> = (props) => {
  const {
    align,
    alt = '',
    aspectRatio,
    className,
    height,
    href,
    linkClass,
    linkTarget,
    rel,
    url,
    width,
    ...attrs
  } = props;

  const muiProps = attrsToMuiProps(attrs);

  const imgWidth = width ? parseInt(width) : '100%';
  const imgHeight = height ? parseInt(height) : '100%';

  const img = (
    <Image
      style={{
        aspectRatio: aspectRatio,
        height: imgHeight,
        width: imgWidth,
      }}
      alt={alt}
      className={className}
      height={1000}
      src={url}
      title={props.title}
      width={1000}
    />
  );

  const imageWithLink = href ? (
    <Link
      className={linkClass}
      href={href}
      rel={rel}
      style={{ display: 'inline-block' }}
      target={linkTarget || '_self'}
    >
      {img}
    </Link>
  ) : (
    img
  );

  // Handle alignment for figure
  let alignStyle = {};
  if (align === 'center') alignStyle = { alignItems: 'center' };
  else if (align === 'right') alignStyle = { alignItems: 'flex-end' };
  else if (align === 'left') alignStyle = { alignItems: 'flex-start' };

  // Add WordPress caption support
  const { caption } = props;

  return (
    <figure
      style={{ ...alignStyle, display: 'flex', flexDirection: 'column' }}
      {...muiProps}
    >
      {imageWithLink}
      {caption && (
        <figcaption
          style={{
            textAlign: align === 'center' ? 'center' : 'left',
            width: '100%',
          }}
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      )}
    </figure>
  );
};
