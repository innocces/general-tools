const LOCALSTORAGEKEY = '__general_tools';

export const getItem = (key: string): unknown => {
  const value = localStorage.getItem(LOCALSTORAGEKEY + '-' + key);
  return value ? JSON.parse(value) : null;
};

export const setItem = (key: string, value: unknown) => {
  localStorage.setItem(
    LOCALSTORAGEKEY + '-' + key,
    JSON.stringify(value || ''),
  );
};
