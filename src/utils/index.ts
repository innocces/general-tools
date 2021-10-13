import type { UploadFile } from 'antd/lib/upload/interface';
export const fileToBase64 = (
  file: File | UploadFile<any>,
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file as File);
    reader.onload = (e) =>
      resolve([
        (e?.target?.result as string).split(',')[1],
        e?.target?.result as string,
      ]);
    reader.onerror = (e) => reject(e);
  });
};

interface IGenerateJsDelivrUrlOption {
  owner: string;
  repo: string;
  path: string;
}
export const generateJsDelivrUrl = (
  option: IGenerateJsDelivrUrlOption,
): string => {
  const { owner, repo, path } = option;
  return `https://cdn.jsdelivr.net/gh/${owner}/${repo}/${path}`;
};
