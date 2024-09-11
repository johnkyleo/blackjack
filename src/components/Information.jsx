import React from 'react';

const Mobilemenu = ({ visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className='bg-white absolute py-5 px-3 top-20 right-20 flex-col flex border-t-2 items-center z-40 rounded-lg'>
     <h2 className='font-extrabold '>Blackjack Guide</h2>
      <p className='font-medium'><strong>Objective:</strong> Get a hand value closer to 21 than the dealer's without going over 21.</p>
      <h3 className='font-extrabold mt-3'>Key Rules</h3>
      <ul className='font-medium'>
        <li>Cards 2-10 are face value, face cards are 10, and Aces are 1 or 11.</li>
        <li>Dealer hits until 17 or more.</li>
      </ul>
      <h3 className='font-extrabold mt-3'>Player Options</h3>
      <ul className='font-medium'>
        <li><strong>Hit:</strong> Take another card.</li>
        <li><strong>Stand:</strong> End your turn.</li>     
      </ul>
      <h3 className='font-extrabold mt-3'>Winning and Losing</h3>
      <ul className='font-medium'>
        <li>Win if your hand is closer to 21 than the dealer's.</li>
        <li>Lose if you bust (over 21) or the dealer's hand is closer to 21.</li>
        <li>Draw if you and the dealer have the same hand value.</li>
      </ul>
    </div>
  );
};

export default Mobilemenu;