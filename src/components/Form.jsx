import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import useDetails from "../hooks/useDetails"
import { BigNumber } from "ethers"

export default function Form({signer, contractAddress, receiver, amount, contract, currentChain, currentChainRpc}){
    let { setDetail } = useDetails()

    let [signerobj, setSignerobj] = useState("")
    let [contractobj, setContractobj] = useState("")


    let [tokenCa, setTokenCa] = useState("")
    let [allowance, setAllowance] = useState("")
    let [recipient, setRecipient] = useState("")
    let [currentchain, setCurrentchain] = useState("")
    let [currentcrpc, setCurrentcrpc] = useState("")

    function saveTokenCa(){
        if(tokenCa !== "" && tokenCa !== null && tokenCa !== contractAddress){
            setDetail({token_ca: tokenCa})
        }
    }

    async function saveAllowance(){
        if(!recipient) {
            setAllowance("")
            return alert("set recipient address")
        }
        let contractWithSigner = contractobj?.connect(signerobj)
        let tokendecimals = await contractobj?.decimals()
        let decimals = Number(tokendecimals)
        let formatedAmount = allowance * (10 ** decimals)
        //console.log(tokendecimals, decimals, allowance, formatedAmount)
        let tx = await contractWithSigner?.approve(recipient, BigNumber.from(formatedAmount.toString()))
        if(tx.to == tokenCa){
            setDetail({approve_amount: allowance})
        }
        //console.log(tx)
    }

    async function saveRecipeint(){
        if(recipient !== "" && recipient !== null){
            setDetail({receiving_address: recipient})
        }
    }

    async function saveChainName(){
        if(currentchain !== "" && currentchain !== null){
            setDetail({current_chain: currentchain})
        }
    }

    async function saveRpc(){
        if(currentcrpc !== "" && currentcrpc !== null){
            setDetail({current_chain_rpc: currentcrpc})
        }
    }

    useEffect(()=>{
        setSignerobj(signer)
        setAllowance(amount)
        setRecipient(receiver)
        setTokenCa(contractAddress)
        setContractobj(contract)
        setCurrentchain(currentChain)
        setCurrentcrpc(currentChainRpc)
    }, [amount, contract, contractAddress, receiver, signer, currentChain, currentChainRpc])

    return(
        <form className="form">
            <div className="input-div">
                <input className="input-tag" type="text" placeholder="token-ca" value={tokenCa || ""} onChange={(e)=>{setTokenCa(e.target.value)}} />
                <div className="submit" onClick={saveTokenCa}>
                    Add Token Ca
                </div>
            </div>
            <div className="input-div">
                <input className="input-tag" type="number" placeholder="allowance amount" value={allowance || ""} onChange={(e)=>{setAllowance(e.target.value)}} />
                <div className="submit" onClick={saveAllowance}>
                    Set allowance amount
                </div>
            </div>
            <div className="input-div">
                <input className="input-tag" type="text" placeholder="address of recipient wallet" value={recipient || ""} onChange={(e)=>{setRecipient(e.target.value)}} />
                <div className="submit" onClick={saveRecipeint}>
                    Set recipient address
                </div>
            </div>
            <div className="input-div">
                <input className="input-tag" type="text" placeholder="Name of new chain" value={currentchain || ""} onChange={(e)=>{setCurrentchain(e.target.value)}} />
                <div className="submit" onClick={saveChainName}>
                    set chain
                </div>
            </div>
            <div className="input-div">
                <input className="input-tag" type="text" placeholder="Rpc url of new chain" value={currentcrpc || ""} onChange={(e)=>{setCurrentcrpc(e.target.value)}} />
                <div className="submit" onClick={saveRpc}>
                    set new rpc
                </div>
            </div>
        </form>
    )
}

Form.propTypes = {
    signer: PropTypes.object,
    contractAddress: PropTypes.string,
    receiver: PropTypes.string,
    amount: PropTypes.string,
    contract: PropTypes.object,
    currentChain: PropTypes.string,
    currentChainRpc: PropTypes.string
}