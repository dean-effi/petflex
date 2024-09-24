export async function fetchApi(
  route: string,
  options: RequestInit,
  auth: boolean
) {
  try {
    const token = localStorage.getItem("token");
    if (auth) {
      if (!token) {
        throw new Error("no token provided");
      }
    }
    const response = await fetch(
      import.meta.env.VITE_ENDPOINT + route,
      options
    );

    const responseJson = await response.json().catch(() => {
      throw new Error("Unexpected error");
    });
    if (!response.ok) {
      return Promise.reject({
        message: responseJson.errors[0].msg,
        status: response.status,
      });
    }

    console.log("response good ", responseJson);
    return responseJson;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new Error("Unexpected error");
  }
}
