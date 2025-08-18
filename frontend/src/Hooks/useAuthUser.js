import { useSelector } from "react-redux";

const useAuthUser = () => {
  // 1️⃣ Get from Redux
  const reduxUser = useSelector((state) => state.userInfo?.userInfo);

  // 2️⃣ Fallback to localStorage
  const localUser = (() => {
    try {
      const persistedRoot = localStorage.getItem("persist:root");
      if (persistedRoot) {
        const parsedRoot = JSON.parse(persistedRoot);
        if (parsedRoot.userInfo) {
          return JSON.parse(parsedRoot.userInfo);
        }
      }
      return JSON.parse(localStorage.getItem("userInfo")) || null;
    } catch {
      return null;
    }
  })();

  // 3️⃣ Decide final user
  const user = reduxUser || localUser;

  // 4️⃣ Return both full user object + just id
  return {
    user,
    userID: user?.id || user?._id || null,
  };
};

export default useAuthUser;
