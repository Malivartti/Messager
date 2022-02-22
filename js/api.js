const MAIN_DOMEN = 'chat1-341409.oa.r.appspot.com/'

export const API = {
  TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbGl2YXJ0dGlAeWFuZGV4LnJ1IiwiaWF0IjoxNjQ1NTMzNjI4LCJleHAiOjE2NDU5ODAwMjh9.IBhHlYGsA2OWs6GsrtIqT6GKdrsWjCUHfKAMGaYSVQk',
  USER: `https://${MAIN_DOMEN}api/user`,
  MESSAGES: `https://${MAIN_DOMEN}api/messages`,
  WEBSOCKETS: `ws://${MAIN_DOMEN}websockets`,
}

export async function getRequest(url, method, args) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  if (args?.token) headers.Authorization = `Bearer ${args.token}`;

  const fetchValue = {
    method,
    headers,
    ...(args.method != 'GET' && {body: JSON.stringify(args.body)})
  }
  
  try {
    const response = await fetch(url, fetchValue);
    if (response.ok) {
      const json = await response.json();
      return json
    } else {
      throw new Error("Ошибка HTTP: " + response.status);
    }
  } catch(error) {
    throw new Error(error);
  };
}