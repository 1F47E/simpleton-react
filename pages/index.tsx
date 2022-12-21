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

import Header from "../components/Header"
import dayjs from 'dayjs';
import Api from '../services/api';
import AccountInfo from '../components/AccountInfo';

const radius = "md"
const size = "md"

const formDataDefault = { address: '' }

type Account = {
  balance_nano: number,
  balance_ton: string
  is_active: boolean,
  status: string
}

type Transaction = {
  timestamp: number,
  direction: string,
  amount_ton: string,
  amount_nano: number,
  address: string,
  comment: string,
}


const Home = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const theme = useMantineTheme()

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState(formDataDefault)
  const [account, setAccount] = useState<Account | null>(null)
  const [transactions, setTransactions] = useState<Transaction[] | null>(null)


  const handleInputChange = (event: any) => {
    console.log(event.target.name)
    setFormData(prevData => ({
      ...prevData,
      [event.target.name]: event.target.value
    }))
  }

  // check if formdata.address is not empty and return bool
  const isInputNotEmpty = () => {
    return formData.address.length > 0
  }


  const handleApiCall = (call: string) => {
    const address = formData.address
    // setAccount(null)
    if (call === "account") {
      setTransactions(null)
    }
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
    Api.apiCall(formData.address, call).then(
      (data) => {
        if (call === "account") setAccount(data);
        if (call === "transactions") setTransactions(data);
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
    <Header />

      <Container size={420} my={40}>
        <Paper radius="md">

          <div style={{ minWidth: 320, position: 'relative' }}>
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
              icon={<IconSearch />}
              sx={{ width: "100%" }}
            />

            {isInputNotEmpty() &&
              <Center>
                <Button
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'blue', deg: 50 }}
                  radius={radius}
                  size={size}
                  mt="xl"
                  fullWidth
                  onClick={() => handleApiCall("account")}
                  disabled={isLoading}
                >Look up</Button>
              </Center>
            }

          </div>
        </Paper>
      </Container>


      <Container my={40}>
        {account &&
          <>
            <Center>
              <AccountInfo account={account} />
            </Center>
            {account && account.is_active && 
              <Center>
                <Button
                  variant="gradient"
                  gradient={{ from: 'red', to: 'grape', deg: 20 }}
                  radius={radius}
                  size="sm"
                  mt="xl"
                  // fullWidth
                  onClick={() => handleApiCall("transactions")}
                  disabled={isLoading}
                >{transactions ? `Reload transactions` : `Load transactions`}</Button>
              </Center>
            }
            <Space h="xl" />
          </>
        }

        {transactions &&

          <Center>
            <Table
              // striped 
              highlightOnHover
              withBorder
              // withColumnBorders
              verticalSpacing="md"
            >
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Direction</th>
                  <th>Amount</th>
                  {/* <th>Address</th> */}
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {/* timestamp: number,
              direction: string,
              amount_ton: string,
              amount_nano: number,
              address: string,
              comment: string, */}
                {transactions?.map((transaction) => (
                  <tr key={transaction.timestamp}>
                    <td>
                      {/* convert timestamp to date with dayjs */}
                      {dayjs.unix(transaction.timestamp).format('DD.MM.YYYY HH:mm')}
                    </td>
                    <td width={50} align="center">
                      {transaction.direction === "in"
                        ?
                        <Badge color="green">IN</Badge>
                        :
                        <Badge color="red">OUT</Badge>
                      }

                    </td>
                    <td>
                      {transaction.amount_ton} TON
                    </td>
                    {/* <td>{transaction.address}</td> */}
                    <td>{transaction.comment}</td>

                  </tr>
                ))}
              </tbody>
            </Table>
          </Center>
        }
      </Container>



    </>
  )
}

export default Home
