import { useEffect, useState } from 'react'
import useDetails from './hooks/useDetails'
import './App.css'
import { ethers } from 'ethers'
import erc20Contract from './ethereum/erc20'
import Header from './components/Header'
import Form from './components/Form'
import InfoDisplay from './components/InfoDisplay'

function App() {
  let { details, detailsLoading, detailsStatus, setDetail } = useDetails()
  const [address, setAddress] = useState(0)
  const [allowance, setTokenAllowance] = useState("")
  const [signer, setSigner] = useState()
  const [tokenContract, setTokenContract] = useState()
  const [tokenReceiver, setTokenReceiver] = useState("")
  const [tokenContractAddress, setTokenContractAddress] = useState("")
  let [currentChain, setCurrentChain] = useState("")
  let [currentChainRpc, setCurrentChainRpc] = useState("")


  async function connectWallet(){
    if(typeof window != 'undefined' && typeof window.ethereum != 'undefined'){
      if(tokenContractAddress){
        try{
          let provider = new ethers.providers.Web3Provider(window.ethereum)
          let accounts = await provider.send("eth_requestAccounts")
          let signer = provider.getSigner()
          let contract = erc20Contract(tokenContractAddress, provider)
          if(!address){
            setDetail({owner_address: accounts[0]})
          }
          setAddress(accounts[0])
          setSigner(signer)
          setTokenContract(contract)
          //console.log('signer:', signer, "accounts:",accounts, "contract", contract)
        }catch(err){
          alert(err.message);
        }
      }else{
        alert("Add token CA to connect wallet")
      }
    }
  }

  async function getCurrentConnectedWallet(){
    if(typeof window != 'undefined' && typeof window.ethereum != 'undefined'){
      if(tokenContractAddress){
        try{
          let provider = new ethers.providers.Web3Provider(window.ethereum)
          let accounts = await provider.send("eth_accounts", [])
          if(accounts.length > 0){
            let signer = provider.getSigner()
            let contract = erc20Contract(tokenContractAddress, provider)
            setSigner(signer)
            setTokenContract(contract)
            //console.log("signer", signer, "address:", address, "contract:", contract);
          }else{
            alert("Click on the connect wallet button to connect")
          }
        }catch(err){
          alert(err.message)
        }
      }else{
        alert("Set token CA of the token you wish to move, This can be changed anytime")
      }
    }else{
      alert("Install metamask to connect")
    }
  }

  async function addWalletListener(){
    if(typeof window != 'undefined' && typeof window.ethereum != 'undefined'){
      window.ethereum.on('accountsChanged', (accounts)=>{
        setAddress(accounts[0])
      })
    }else{
      setAddress("")
      alert("Install metamask to connect");
    }
  }

  useEffect(()=>{
    //console.log("in useEffect", details)
    setAddress(details.owner_address)
    setTokenContractAddress(details.token_ca)
    setTokenAllowance(details.approve_amount)
    setTokenReceiver(details.receiving_address)
    setCurrentChain(details.current_chain)
    setCurrentChainRpc(details.current_chain_rpc)

    if(details.owner_address){
      getCurrentConnectedWallet()
    }  
    addWalletListener()
  },[details])

  return (
    <div>
      <Header currentChain={currentChain} walletAddress={address} connectWallet={connectWallet} />
      {detailsStatus.error && <div className='err-div'> {detailsStatus.message} </div>}
      <Form 
        signer={signer} 
        contractAddress={tokenContractAddress} 
        receiver={tokenReceiver} 
        amount={allowance} 
        contract={tokenContract}
        currentChain={currentChain}
        currentChainRpc={currentChainRpc}
      />
      {detailsLoading && <div> Loading user details...</div>}
      <InfoDisplay details={details} />
    </div>
  )
}

export default App
