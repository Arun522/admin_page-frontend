// Separate API module for fetching data
export const getUsersData = async () => {
    try {
      const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Error fetching users:', error);
    }
  };
  