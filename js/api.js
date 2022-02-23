const MAIN_DOMEN = 'chat1-341409.oa.r.appspot.com/'

export const API = {
  TOKEN: undefined,
  EMAIL: undefined,
  USER: `https://${MAIN_DOMEN}api/user`,
  ME: `https://${MAIN_DOMEN}api/user/me`,
  MESSAGES: `https://${MAIN_DOMEN}api/messages`,
  WEBSOCKETS: `wss://${MAIN_DOMEN}websockets`,
};

export async function getRequest(url, method, args) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
  if (args?.token) headers.Authorization = `Bearer ${args.token}`;

  const fetchValue = {
    method,
    headers,
    ...(method != 'GET' && {body: JSON.stringify(args.body)})
  };
  try {
    const response = await fetch(url, fetchValue);
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      throw new Error("Ошибка HTTP: " + response.status);
    };
  } catch(error) {
    throw new Error(error);
  };
};