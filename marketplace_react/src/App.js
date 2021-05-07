import { useCallback, useEffect, useState } from 'react';
import Web3 from 'web3'
import Web3Modal from "web3modal";

import { PLACES_ABI, PLACES_ADDRESS } from './config'
import MenuCustom from './components/MenuCustom';
import Home from './components/menu/Home';
import CreatePlace from './components/menu/CreatePlace';

import PlaceDetail from './pages/PlaceDetail';
import MyHouses from './components/menu/MyHouses';

const providerOptions = {};

const web3Modal = new Web3Modal({
  network: "kovan", // optional
  cacheProvider: true, // optional
  providerOptions // required
});

const App = () => {
  const [account, setAccount] = useState([]);
  const [server, setServer] = useState();
  const [web3, setWeb3] = useState();
  const [activeTab, setActiveTab] = useState(0);
  const [placeDetail, setPlaceDetail] = useState();

  const init = useCallback( async () =>  {
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    setWeb3(web3);
    setAccount(web3._provider.selectedAddress);
    setServer(new web3.eth.Contract(PLACES_ABI, PLACES_ADDRESS));
  }, []);

  useEffect(() => {
    setInterval(() => {
      init();
    }, 500);
  }, [init]);

  return (
    <div style={styles.container}>
      <MenuCustom 
        onTabClick={setActiveTab} 
        activeTab={activeTab}
        removePlace={() => setPlaceDetail()} 
      />
      {!placeDetail && activeTab === 0 && <Home server={server} onPlaceClick={setPlaceDetail} account={account} />}
      {placeDetail && activeTab === 0 && <PlaceDetail place={placeDetail} server={server} account={account} web3={web3} />}
      {activeTab === 1 && <MyHouses server={server} account={account} web3={web3} />}
      {activeTab === 2 && <CreatePlace server={server} account={account} />}
    </div>
  );
};

const styles = {
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,

  },
};

export default App;
