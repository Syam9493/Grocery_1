import React from 'react';
import WhishList from '../Components/WhishList';

const WhishListScreen = () => {
  return (
    <>
      <table className='mt-4 w-6xl table-auto text-left'>
        <thead >
          <tr className='border-2 bg-yellow-500 text-white'>
          <td className='p-4'>Product</td>
          <td className='p-4'>Price</td>
          <td className='p-4'>Date Added</td>
          <td className='p-4'>Stock Staus</td>
        </tr>
        </thead>
        
      </table>
    </>
  )
}

export default WhishListScreen