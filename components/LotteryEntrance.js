import { useMoralis, useWeb3Contract } from 'react-moralis'
import { abi } from '../constants/abi.json'
import { useState, useEffect } from 'react'

const CONTRACT_ADDRESS = '0x7f2131105A6280F7458E8bb19AD0e39726c89d62'

export default function LotteryEntrance() {
  const { isWeb3Enabled } = useMoralis()
  const [recentWinner, setRecentWinner] = useState('0')

  // Enter Lottery Button
  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi: abi,
    contractAddress: CONTRACT_ADDRESS,
    functionName: 'enterRaffle',
    msgValue: '100000000000000000', // 0.1ETH
    params: {},
  })

  // View Functions
  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: CONTRACT_ADDRESS,
    functionName: 's_recentWinner',
    params: {},
  })

  useEffect(() => {
    async function updateUi() {
      const recentWinnerFromCall = await getRecentWinner()
      setRecentWinner(recentWinnerFromCall)
    }
    if (isWeb3Enabled) {
      updateUi()
    }
  }, [isWeb3Enabled, getRecentWinner])

  return (
    <div>
      <button
        className='rounded ml-auto font-bold bg-blue-400'
        onClick={async () => {
          await enterRaffle()
        }}
      >
        Enter Lottery!
      </button>
      <div>The Most Recent Winner was: {recentWinner}</div>
    </div>
  )
}
