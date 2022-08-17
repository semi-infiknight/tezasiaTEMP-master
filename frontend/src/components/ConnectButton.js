// import { ConnectButton } from '@rainbow-me/rainbowkit';
import { connectWallet, getAccount,disconnectWallet} from '../toolkit/wallet'
import { useState, useEffect } from 'react';

export const Connect = (props) => {
  const [ account, setaccount ] = useState( "" );

  useEffect( () => {
    ( async () => {
      const activeAccount = await getAccount();
      setaccount( activeAccount );
    } )();
  }, [] );


  const connectWalletHandler = async () => {
    await connectWallet();
    const activeAccount = await getAccount();
    setaccount( activeAccount );
  }

  if(account == ''){
    return(
      <div>
      <button className="btn btn-primary" onClick={ connectWalletHandler }>
        Connect Wallet
      </button>
    </div>
    )
  }else{
    return(
    <div className="d-flex justify-center align-items-center">
    <div className='mr-3'>Contract Address - {account.substring( 0, 5 ) +
"..." +
account.substring( account.length - 5, account.length )}</div>
    <button className="btn btn-primary" onClick={ disconnectWallet }>
      Logout
    </button>
  </div>
  )
}
}
