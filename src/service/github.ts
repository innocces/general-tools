import { getItem } from '@/utils/storage';
import { GITHUBCHOOSELOCALKEY, GITHUBLOCALKEY } from '@/constant';
import type { IGithubSetting } from '@/pages/drawerBed/type';
import type { IRecord } from '@/type';
import fetch from '@/utils/fetch';

export const HOST = 'https://api.github.com';

const fetchForGithub = (url: string, option?: RequestInit) => {
  const githubSettings = getItem(GITHUBLOCALKEY) as IGithubSetting[];
  const chooseGithub = getItem(GITHUBCHOOSELOCALKEY);
  const headers: IRecord = {};
  if (githubSettings?.length && chooseGithub) {
    const setting = githubSettings.find((v) => v.repo === chooseGithub);
    if (setting?.token) {
      headers.Authorization = `token ${setting.token}`;
    }
  }
  return fetch(`https://api.github.com${url}`, { ...(option || {}), headers });
};

export interface IBaseOption {
  owner: string;
  repo: string;
}

export interface ICreateCommitOption extends IBaseOption {
  path: string;
  content: string;
  sha?: string;
}

export const createCommit = (option: ICreateCommitOption) => {
  const { content, sha } = option;
  const url = generateCommitUrl(option);
  const body: Record<string, any> = {
    content,
    message: 'files(content): general tools commit',
  };
  if (sha) {
    body.sha = sha;
  }
  return fetchForGithub(url, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
};

export const getContent = (option: ICreateCommitOption) => {
  const url = generateCommitUrl(option);
  return fetchForGithub(url);
};

export const generateCommitUrl = (
  option: ICreateCommitOption,
  prefix?: string,
): string => {
  const { owner, repo, path } = option;
  const url = `${prefix || ''}/repos/${owner}/${repo}/contents/${path}`;
  return url;
};

export const getRepo = (option: IBaseOption) => {
  const { owner, repo } = option;
  return fetchForGithub(`/repos/${owner}/${repo}`);
};
