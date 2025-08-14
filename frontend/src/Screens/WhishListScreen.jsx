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
          <th className='p-4'>Product</th>
          <th className='p-4'>Price</th>
          <th className='p-4'>Date Added</th>
          <th className='p-4'>Stock Status</th>
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