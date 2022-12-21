import { useState, useEffect } from 'react'
import uuid from 'react-uuid'
import {
  Title,
  Container,
  Center,
  PasswordInput,
  TextInput,
  Textarea,
  Button,
  Space,
  Paper,
  Group,
  Switch,
  Grid,
  Code,
  Text,
  Mark,
  Table,
  Menu,
  SimpleGrid,
  Flex,
  Overlay,
  LoadingOverlay,
  Anchor,
  useMantineTheme,
  Badge,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import {
  IconSun,
  IconMoonStars,
  IconLogout,
  IconUser,
  IconBrandGithub,
  Icon123,
  IconBomb,
  IconSearch
} from '@tabler/icons';



export default function Header() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    const theme = useMantineTheme()


    return (
        <Flex
        mih={50}
        bg="rgba(0, 0, 0, .3)"
        // gap="md"
        justify="flex-end"
      // align="center"
      // direction="row"
      // wrap="wrap"
      >

        <Group position="right" sx={{ padding: 10, margin: 10 }}>
          <Switch
            size="md"
            color={dark ? 'gray' : 'dark'}
            onLabel={<IconSun size={16} stroke={2.5} color={theme.colors.yellow[4]} />}
            offLabel={<IconMoonStars size={16} stroke={2.5} color={theme.colors.blue[6]} />}
            onClick={() => toggleColorScheme()}
          />
        </Group>

      </Flex>
    )
}