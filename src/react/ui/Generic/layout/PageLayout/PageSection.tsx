import clsx from 'clsx';
import React, { FC, memo, ReactNode } from 'react';

import { usePageSectionStyles } from './usePageLayoutStyles';

interface PageSectionProps {
  children?: ReactNode;
  noBg?: boolean;
  gutters?: boolean;
  containerClassName?: string;
}

const PageSection: FC<PageSectionProps> = memo(({
  children,
  containerClassName,
  noBg,
  gutters,
}) => {
  const classes = usePageSectionStyles();
  const className = clsx(
    classes.pageSectionContainer,
    containerClassName,
    noBg && classes.noBg,
    gutters && classes.gutters,
  );

  return (
    <section className={className}>
      {children}
    </section>
  );
});

export default PageSection;
