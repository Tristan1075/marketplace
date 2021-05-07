import axios from 'axios';

export const converETHToEuro = async (ETH) => {
  const res = await axios('https://api.coinbase.com/v2/prices/ETH-EUR/sell');
  return ETH*res.data.data.amount;
};

export const getRandomString = () => Math.random().toString(36).substr(2, 5);
