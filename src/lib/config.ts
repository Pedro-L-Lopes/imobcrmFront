export const api: string = "https://localhost:7097/";

export const requestConfig = (
  method: string,
  data: any,
  token: string | null = null,
  image: any = null
): RequestInit => {
  let config: RequestInit = {
    method,
    headers: {},
  };

  if (image) {
    (config as any).body = data;
  } else if (method !== "DELETE" && data !== null) {
    (config as any).body = JSON.stringify(data);
    (config.headers as any) = { "Content-Type": "application/json" };
  }

  if (token) {
    (config.headers as any) = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
};
