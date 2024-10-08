export async function fetchApi(
  route: string,
  options: RequestInit,
  auth: boolean
) {
  try {
    const token = localStorage.getItem("token");
    //if needs to be authenticated, check for token, if available, attach to head
    if (auth) {
      if (!token) {
        return Promise.reject({
          message: "unauthorized",
          status: 403,
        });
      } else {
        options = {
          ...options,
          headers: {
            ...options.headers,
            authorization: token,
          },
        };
      }
    }
    console.log(import.meta.env.VITE_ENDPOINT + route);
    const response = await fetch(
      import.meta.env.VITE_ENDPOINT + route,
      options
    ).catch(() => {
      console.log("couldn't reach endpoint");
      throw Error;
    });
    const responseJson = await response.json().catch(() => {
      throw Error;
    });
    if (!response.ok) {
      return Promise.reject({
        message: responseJson.errors[0].msg,
        status: response.status,
      });
    }

    // console.log("response good ", responseJson);
    return responseJson;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return Promise.reject({
      message: "Unexpected error",
      status: 500,
    });
  }
}

export async function postPet(newPet: any) {
  const data = new FormData();
  data.append("name", newPet.name);
  data.append("description", newPet.description);
  data.append("petType", newPet.petType);
  data.append("gender", newPet.gender);
  data.append("birthDate", newPet.birthDate);
  data.append("image", newPet.image);

  return fetchApi(
    "posts",
    {
      method: "POST",
      body: data,
    },
    true
  );
}
