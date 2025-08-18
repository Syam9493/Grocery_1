import { useEffect} from 'react';
import {useDispatch} from 'react-redux';


import WhishList from '../Components/WhishList';
import {addToWishList} from '../Slice/WhishListSlice.js';
import {useGetUserWishListQuery} from '../ApiSlice/whishListSlice.js';
import useAuthUser from '../Hooks/useAuthUser.js';


const WhishListScreen = () => {
const dispatch = useDispatch();
const {userID} = useAuthUser();
const {data: wishListItems, isLoading, error} = useGetUserWishListQuery(userID);
console.log("Fetched Wishlist Items:", wishListItems);

useEffect(() => {
  if (wishListItems) {
    dispatch(addToWishList(wishListItems.wishList || []));
  }
}, [dispatch, wishListItems]);

if (isLoading) return <div>Loading...</div>;
if (error) return <div>Error fetching wishlist</div>;



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
          <WhishList wishListItems={wishListItems} isLoading={isLoading} isError={error} />
        </tbody>
      </table>
    </>
  )
}

export default WhishListScreen;