export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userToken = JSON.parse(localStorage.getItem("userToken"));

  if (user && userToken) {
    return { Authorization: "Bearer " + userToken };
  } else {
    return {};
  }
}
