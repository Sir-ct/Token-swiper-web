import PropTypes from "prop-types"

export default function Header({currentChain, walletAddress, connectWallet}){
  //console.log("wallet address", walletAddress)
    return(
      <div className='header'>
        <div>Token Swiper</div>
        <div>
          <div onClick={ walletAddress != "" && walletAddress != null ? undefined : connectWallet} className="connect-wallet">
            {
                walletAddress != "" && walletAddress != null
                ?
                walletAddress?.slice(0, 4) + "...." + walletAddress?.slice(walletAddress.length - 4, walletAddress.length)
                :
                "Connect Wallet"
            }
          </div>
          <div>
            {currentChain}
          </div>
        </div>
        
      </div>
    )
}

Header.propTypes = {
    walletAddress: PropTypes.string,
    currentChain: PropTypes.string,
    connectWallet: PropTypes.func
}