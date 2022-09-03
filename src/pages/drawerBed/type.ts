import type { ModalProps } from 'antd';
export interface IGithubSetting {
  user: string;
  repo: string;
  token: string;
}

export type TMode = 'add' | 'modifiy';

export interface IAddGithubModalProps extends Omit<ModalProps, 'onOk'> {
  chooseGithub: IGithubSetting;
  mode: TMode;
  onOk: (setting: IGithubSetting) => void;
}

export type SpecialFile = {
  dir: string;
  name: string;
};
