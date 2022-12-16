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
import { Prism } from '@mantine/prism';
import jwtDecode, { JwtPayload } from "jwt-decode";
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import {
  IconSun,
  IconMoonStars,
  IconLogout,
  IconUser,
  IconBrandGithub,
  Icon123,
  IconBomb
} from '@tabler/icons';
import dayjs from 'dayjs';


import AuthService from '../services/api';

const radius = "md"
const size = "md"


// check token, return JwtPayload
// const checkToken = async (token: string) => {
const checkToken = (token: string): JwtPayload | null => {
  console.log('decoding token: ', token);
  try {
    const decodedHeader = jwtDecode<JwtPayload>(token, { header: true });
    const decodedPayload = jwtDecode<JwtPayload>(token, { header: false });
    console.log('decodedHeader: ', decodedHeader);
    console.log('decodedPayload: ', decodedPayload);
    return decodedPayload;
  } catch (error) {
    console.log('error: ', error);
    return null;
  }
}

// // create type user extend JwtPayload
type User = JwtPayload & {
  name: string;
  type: string;
}

type TokenDecoded = {
  header: JwtPayload;
  body: JwtPayload;
  signature: string;
}

const formDataDefault = { address: '' }

type Account = {
  balance_nano: number,
  balance_ton: string
  is_active: boolean,
  status: string
}

const Home = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const theme = useMantineTheme()

  const [isLoading, setIsLoading] = useState(false);

  const [mode, setMode] = useState('signin');
  const [formData, setFormData] = useState(formDataDefault)
  const [account, setAccount] = useState<Account | null>(null)
  // tokenData
  // TODO: refactor all token data to one obj
  const [user, setUser] = useState<JwtPayload | null>(null)
  // tokenHeader
  const [tokenHeader, setTokenHeader] = useState<JwtPayload | null>(null)


  const handleInputChange = (event: any) => {
    console.log(event.target.name)
    setFormData(prevData => ({
      ...prevData,
      [event.target.name]: event.target.value
    }))
  }


  const handleScan = (e: any) => {
    const address = formData.address
    if (!address) {
      showNotification({
        color: 'red',
        title: 'Error',
        message: 'Address is empty',
      })
      return
    }
    console.log(JSON.stringify(formData))
    setIsLoading(true);
    const url = "/address/" + address


    AuthService.addressInfo(formData.address).then(
      (data) => {
        setAccount(data);
        setIsLoading(false);
        console.log(data)
      },
      error => {
        setIsLoading(false);
        showNotification({
          color: 'red',
          title: 'server error',
          message: error,
        })
      }
    );
  }

  return (
    <>
      <Flex
        // mih={50}
        // bg="rgba(0, 0, 0, .3)"
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

      <Container size={420} my={40}>
        <Paper radius="md">

          <div style={{ width: 400, position: 'relative' }}>
            {isLoading && <LoadingOverlay
              loaderProps={{ size: 'md', color: 'blue', variant: 'bars' }}
              overlayOpacity={0.5}
              overlayColor={theme.colors.dark[7]}
              transitionDuration={500}
              visible
            />}

            <Space h="xl" />
            <TextInput
              placeholder="TON address"
              name="address"
              radius={radius}
              size={size}
              value={formData.address}
              onChange={handleInputChange}
              withAsterisk
            />

            <Center>
              <Button
                variant="gradient"
                gradient={{ from: 'indigo', to: 'blue', deg: 50 }}
                radius={radius}
                size={size}
                mt="xl"
                fullWidth
                onClick={handleScan}
                disabled={isLoading}
              >Scan</Button>
            </Center>
          </div>
        </Paper>
      </Container>


      <Container my={40}>
        {account &&
          <Center>
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
              <Group>
                <Text>Balance</Text>
                {account?.balance_ton} TON
              </Group>
            </Paper>

          </Center>
        }
        <Center>
          <Paper mt="md" radius="md" sx={{ padding: 20 }}>


            <Table striped highlightOnHover sx={{ maxWidth: 520 }}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Direction</th>
                  <th>Amount</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                <tr key='uid'>
                  <td>16.12.2022 12:12</td>
                  <td>
                    <Badge color="green">IN</Badge>
                  </td>
                  <td>0.012312 TON</td>
                  <td>123</td>
                </tr>
                <tr key='type'>
                  <td>16.12.2022 12:12</td>
                  <td>
                    <Badge color="red">OUT</Badge>
                  </td>
                  <td>0.012312 TON</td>
                  <td>123</td>
                </tr>
                <tr key='iat'>
                  <td>16.12.2022 12:12</td>
                  <td>
                    <Badge color="green">IN</Badge>
                  </td>
                  <td>33 TON</td>
                  <td>123</td>
                </tr>
              </tbody>
            </Table>
          </Paper>
        </Center>
      </Container>



    </>
  )
}

export default Home
