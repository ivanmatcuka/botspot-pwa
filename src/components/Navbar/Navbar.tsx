'use client';

import { TemplatePartClient } from '@/wordpress/TemplatePartClient';
import {
  Box,
  Drawer,
  List,
  IconButton as MuiIconButton,
  useMediaQuery,
  useTheme,
} from '@botspot/ui';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { usePathname } from 'next/navigation';
import { FC, useState } from 'react';

import { NavbarDrawer } from './NavbarDrawer';
import { NavbarMenu } from './NavbarMenu';

type MenuItem = {
  children?: MenuItem[];
  disabled?: boolean;
  href?: string;
  label: string;
  onClick?: () => void;
};

type NavbarProps = {
  navItems: MenuItem[];
};
export const Navbar: FC<NavbarProps> = ({ navItems }) => {
  const currentPath = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const { breakpoints } = useTheme();
  const matches = useMediaQuery(breakpoints.up('xl'));

  return matches ? (
    navItems.map((item, index) => (
      <NavbarMenu currentPath={currentPath} item={item} key={index} />
    ))
  ) : (
    <Box display="flex" flex={1} justifyContent="flex-end">
      <MuiIconButton
        aria-label="menu"
        className="block xl:none"
        color="inherit"
        edge="start"
        onClick={() => setIsOpen(!isOpen)}
        size="large"
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </MuiIconButton>
      <Drawer
        slotProps={{
          backdrop: { sx: { top: 64 } },
          root: { style: { top: 64 } },
        }}
        anchor="top"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        PaperProps={{ sx: { top: 64 } }}
      >
        <List>
          {navItems.map((item, index) => (
            <NavbarDrawer
              item={item}
              key={index}
              onOpen={() => setIsOpen(false)}
            />
          ))}
          <Box
            display="flex"
            justifyContent="center"
            p={2}
            sx={{ a: { display: 'block !important' } }}
          >
            <TemplatePartClient slug="contact-button" />
          </Box>
        </List>
      </Drawer>
    </Box>
  );
};
