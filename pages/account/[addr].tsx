import { 
  Center, 
  Title,
  Text,
  Space,
  Image,
  LoadingOverlay,
  useMantineTheme
} from '@mantine/core'
import { useRouter } from 'next/router'
import { 
  useEffect,
  useState
} from 'react'
import AccountInfo from '../../components/AccountInfo'
import Header from '../../components/Header'

import { Account } from "../../types/account";
import Api from '../../services/api';
import { stringify } from 'querystring'
import { showNotification } from '@mantine/notifications';

const SERVER_HOST = process.env.NEXT_PUBLIC_SERVER_HOST as string;

const Account = () => {
  const theme = useMantineTheme()
  const router = useRouter()
  const { addr } = router.query
  const [account, setAccount] = useState<Account | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  // convert queryAddress to string
  const address = addr?.toString()

  const url_qr_code = `${SERVER_HOST}/account/${address}/qr`

  // load data on mount
  useEffect(() => {
    if (address) {
          // setAccount(null)
          const call = "account"
    setIsLoading(true);
    Api.apiCall(address, "account").then(
      (data) => {
         setAccount(data);
        setIsLoading(false);
        console.log(data)
        showNotification({
          color: 'green',
          title: 'OK',
          message: 'Account loaded',
        })
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
  }, [address])

  return (
    <>
      <Header />
        <Space h="xl" />
      <Center>
        <Image src={url_qr_code} alt={address} width={200} height={200} />
      </Center>
        <Space h="md" />
      <Center>
        <Text fw={500} fs="xl">{address}</Text>
      </Center>
        <Space h="xl" />
      <Center>
      {isLoading && <LoadingOverlay
              loaderProps={{ size: 'md', color: 'blue', variant: 'bars' }}
              overlayOpacity={0.5}
              overlayColor={theme.colors.dark[7]}
              transitionDuration={500}
              visible
            />}

            
        {account &&
        <AccountInfo account={account} />
        }
      </Center>
  </>
  )

}

export default Account
