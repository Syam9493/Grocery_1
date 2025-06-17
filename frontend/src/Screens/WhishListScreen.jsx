import React from 'react';
import WhishList from '../Components/WhishList';
import { useSelector } from 'react-redux';


const WhishListScreen = () => {

const whishLists = useSelector((state) => state.whishList);

const {wishListItems} = whishLists

  return (
    <>
      <table className='table-auto text-left mt-5 mb-5 mx-auto'>
        <thead >
          <tr className='border-2 bg-yellow-500 text-white'>
          <td className='p-4'>Product</td>
          <td className='p-4'>Price</td>
          <td className='p-4'>Date Added</td>
          <td className='p-4'>Stock Staus</td>
        </tr>
        </thead>
        <tbody>
          <WhishList wishListItems={wishListItems}/>
        </tbody>
      </table>
    </>
  )
}

export default WhishListScreen;