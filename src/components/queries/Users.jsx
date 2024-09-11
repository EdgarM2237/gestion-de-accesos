const fetchUsers = async () => {
  try {
    const response = await fetch("http://192.168.1.7:5000/api/usuario");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchUsers;
