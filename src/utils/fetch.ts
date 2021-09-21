import { message } from 'antd';

export default async (url: string, init: RequestInit) => {
  const responese = await fetch(url, { ...(init || {}), credentials: 'omit' });
  const responeseService = await responese.json();
  if (responese.status >= 300) {
    message.error(responeseService.message);
  }
  return responeseService;
};
