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



export default function AccountInfo(props: any) {
    const { account } = props;
    return (
        <>
        {account ?
        <Paper shadow="xs" radius="md" p="md" withBorder sx={{ maxWidth: 420 }}>
        <Group>
          <Text>Status</Text>
          {account?.is_active
            ?
            <Badge color="green">Active</Badge>
            :
            <Badge color="red">Not active</Badge>
          }
        </Group>
        {account?.is_active &&
          <Group>
            <Text>Balance</Text>
            {account?.balance_ton} TON
          </Group>
        }
      </Paper>
        :
        <>`Account not found`</>
        }
        </>
    )
}