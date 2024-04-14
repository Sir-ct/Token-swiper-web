import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import useDetails from "../hooks/useDetails"
import { BigNumber } from "ethers"

export default function Form({signer, contractAddress, receiver, amount, contract}){
    let { setDetail } = useDetails()

    let [signerobj, setSignerobj] = useState("")
    let [contractobj, setContractobj] = useState("")


    let [tokenCa, setTokenCa] = useState("")
    let [allowance, setAllowance] = useState("")
    let [recipient, setRecipient] = useState("")

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
        console.log(tokendecimals, decimals, allowance, formatedAmount)
        let tx = await contractWithSigner?.approve(recipient, BigNumber.from(formatedAmount.toString()))
        if(tx.to == tokenCa){
            setDetail({approve_amount: allowance})
        }
        console.log(tx)
    }

    function saveRecipeint(){
        if(recipient !== "" && recipient !== null){
            setDetail({receiving_address: recipient})
        }
    }

    useEffect(()=>{
        setSignerobj(signer)
        setAllowance(amount)
        setRecipient(receiver)
        setTokenCa(contractAddress)
        setContractobj(contract)
    }, [amount, contract, contractAddress, receiver, signer])

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
        </form>
    )
}

Form.propTypes = {
    signer: PropTypes.object,
    contractAddress: PropTypes.string,
    receiver: PropTypes.string,
    amount: PropTypes.string,
    contract: PropTypes.object
}