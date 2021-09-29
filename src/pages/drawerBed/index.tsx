import React, { FC, useEffect, useState, useCallback } from 'react';
import {
  Form,
  message,
  Upload,
  Input,
  Select,
  Alert,
  Button,
  Modal,
  Row,
  Col,
  Image,
  Comment,
  Avatar,
  Tooltip,
} from 'antd';
import moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SelectOutlined, CopyOutlined } from '@ant-design/icons';

import type { IGithubSetting, TMode, IAddGithubModalProps } from './type';
import type { IRecord } from '@/type';

import { getItem, setItem } from '@/utils/storage';
import { GITHUBCHOOSELOCALKEY, GITHUBLOCALKEY } from '@/constant';
import { fileToBase64, generateJsDelivrUrl } from '@/utils';
import { getRepo, createCommit } from '@/service/github';
import './index.less';
import { UploadFile } from 'antd/lib/upload/interface';

const Dragger = Upload.Dragger;
const Option = Select.Option;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};
const AddGithubModal: FC<IAddGithubModalProps> = ({
  chooseGithub,
  mode,
  onOk,
  ...modalProps
}) => {
  const [form] = Form.useForm();
  const handleOnOk = useCallback(() => {
    form.validateFields().then((values) => {
      if (Object.values(values).length < 3) {
        message.warn('您尚有选项未填充!');
      } else {
        onOk(values);
      }
    });
  }, [form]);
  return (
    <Modal
      {...modalProps}
      title={mode === 'add' ? '添加配置' : `修改${chooseGithub.repo}配置`}
      okText="确认"
      cancelText="取消"
      onOk={handleOnOk}
      destroyOnClose
    >
      <Form
        form={form}
        initialValues={mode === 'add' ? {} : chooseGithub}
        {...formItemLayout}
      >
        <FormItem
          label="用户名"
          tooltip="user"
          name="user"
          rules={[{ required: true, whitespace: true }]}
        >
          <Input placeholder="请输入用户名" />
        </FormItem>
        <FormItem
          label="仓库名"
          tooltip="repo"
          name="repo"
          rules={[{ required: true, whitespace: true }]}
        >
          <Input placeholder="请输入仓库名" />
        </FormItem>
        <FormItem
          label="access token"
          tooltip={<Image src="/images/repo.png" />}
          extra="该令牌需拥有读写能力"
          name="token"
          rules={[{ required: true, whitespace: true }]}
        >
          <Input placeholder="请输入access token" />
        </FormItem>
      </Form>
    </Modal>
  );
};

const DrawerBed = () => {
  const [githubSettings, setGithubSettings] = useState<IGithubSetting[]>([]);
  const [chooseGithub, changeChooseGithub] = useState<string>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<TMode>('add');
  const [repoInfo, setRepoInfo] = useState<IRecord>();

  useEffect(() => {
    getGithubSettings();
  }, []);

  useEffect(() => {
    chooseGithub?.length && fetchRepoInfo();
  }, [chooseGithub, githubSettings]);

  const getCurrentChooseGithub = useCallback(() => {
    if (!chooseGithub || !githubSettings?.length) {
      return {};
    }
    return githubSettings.find((v) => v.repo === chooseGithub);
  }, [chooseGithub, githubSettings]);

  const fetchRepoInfo = useCallback(() => {
    if (chooseGithub && githubSettings.length) {
      const { user } = getCurrentChooseGithub() as IGithubSetting;
      if (user) {
        getRepo({ repo: chooseGithub, owner: user }).then((res) => {
          if (!res.message) {
            setRepoInfo(res);
          }
        });
      }
    }
  }, [chooseGithub, githubSettings]);

  const handleGithubChooseChange = useCallback((value: string) => {
    setItem(GITHUBCHOOSELOCALKEY, value);
    changeChooseGithub(value);
  }, []);

  const getGithubSettings = useCallback(() => {
    const info = getItem(GITHUBLOCALKEY);
    let githubChoose = getItem(GITHUBCHOOSELOCALKEY);
    if (!githubChoose && (info as IGithubSetting[])?.length) {
      githubChoose = (info as IGithubSetting[])[0].repo;
    }
    githubChoose && handleGithubChooseChange(githubChoose as string);
    info && setGithubSettings(info as IGithubSetting[]);
  }, [handleGithubChooseChange]);

  const handleRepoSetting = useCallback(
    (currentSetting: IGithubSetting) => {
      const { repo } = currentSetting;
      let settings = [...githubSettings];
      if (githubSettings.find((v) => v.repo === repo)) {
        settings = settings.map((v) => {
          if (v.repo === repo) {
            v = currentSetting;
          }
          return v;
        });
      } else {
        settings.push(currentSetting);
      }
      setItem(GITHUBLOCALKEY, settings);
      setGithubSettings(settings);
      setModalVisible(false);
      if (!chooseGithub) {
        const currentChooseGithub = settings[0].repo;
        handleGithubChooseChange(currentChooseGithub);
      }
      message.success(modalMode === 'add' ? '添加成功!' : '修改成功!');
    },
    [modalMode, githubSettings, chooseGithub],
  );

  const handleRemoveKey = useCallback(() => {
    if (githubSettings.length === 1) {
      message.error('当前仅有一个配置, 无法移除!');
      return;
    }
    const settings =
      githubSettings.filter((v) => v.repo !== chooseGithub) || [];
    const currentChooseGithub = settings[0].repo;
    setItem(GITHUBLOCALKEY, settings);
    handleGithubChooseChange(currentChooseGithub);
  }, [githubSettings, chooseGithub]);

  const handleCommit = useCallback(
    ({ file, onError, onSuccess, onProgress }) => {
      onProgress({ percent: 0 }, file);
      const { user: owner, ...repo } =
        getCurrentChooseGithub() as IGithubSetting;
      (async () => {
        const path =
          moment().format('YYYY-MM-DD') + '/' + Date.now() + '-' + file.name;
        const content = await fileToBase64(file);
        try {
          const payload = {
            ...repo,
            owner,
            content,
            path,
          };
          const responese = await createCommit(payload);
          const cdnUrl = generateJsDelivrUrl(payload);
          onProgress({ percent: 100 }, file);
          if (!responese.message) {
            onSuccess({ ...responese, cdnUrl }, file);
          } else {
            onError(responese);
          }
        } catch (e) {
          onError(e);
        }
      })();

      return {
        abort() {
          console.log('upload progress is aborted.');
        },
      };
    },
    [chooseGithub, githubSettings, getCurrentChooseGithub],
  );

  return (
    <div className="__general_tools-inner __general_tools-drawer">
      <Alert
        type="warning"
        message="GitHub 相关信息均存储在本地, 若清空缓存需重新设置! 望知晓。"
      />
      <Row justify="center" align="middle" className="__general_tools-drawer">
        <Col span={3}>
          <span>选择存储仓库: </span>
        </Col>
        <Col span={8}>
          <Select
            value={chooseGithub}
            onChange={handleGithubChooseChange}
            className="__general_tools-drawer-block"
          >
            {githubSettings.map(({ repo }) => (
              <Option key={repo} value={repo}>
                {repo}
              </Option>
            ))}
          </Select>
        </Col>
        <Col span={2}>
          <Button
            type="primary"
            className="__general_tools-drawer-block"
            onClick={() => {
              setModalMode('add');
              setModalVisible(true);
            }}
          >
            添加仓库
          </Button>
        </Col>
        <Col span={2}>
          <Button
            disabled={!chooseGithub}
            type="primary"
            danger
            className="__general_tools-drawer-block"
            onClick={() => {
              setModalMode('modifiy');
              setModalVisible(true);
            }}
          >
            修改仓库配置
          </Button>
        </Col>
        <Col span={2}>
          <Button
            disabled={!chooseGithub}
            type="primary"
            danger
            className="__general_tools-drawer-block"
            onClick={handleRemoveKey}
          >
            移除仓库配置
          </Button>
        </Col>
      </Row>
      {repoInfo?.id ? (
        <Row justify="center">
          <Col span={17}>
            <Comment
              author={
                <Button type="link" target="_blank" href={repoInfo.html_url}>
                  {repoInfo.full_name} /{' '}
                  <Tooltip title={repoInfo.pushed_at}>
                    {repoInfo.pushed_at}
                  </Tooltip>
                </Button>
              }
              avatar={<Avatar src={repoInfo.owner.avatar_url} />}
              content={<p>{repoInfo.description || '暂无仓库简介'}</p>}
              className="__general_tools-drawer-margin"
            />
          </Col>
        </Row>
      ) : null}
      <Row justify="center">
        <Col span={12}>
          <Dragger
            className="__general_tools-drawer-upload"
            accept=".png,.jpg,.jpeg,.PNG,.JPG,.JPEG"
            disabled={!chooseGithub}
            multiple
            listType="picture"
            customRequest={handleCommit}
            onPreview={(file: UploadFile<{ cdnUrl: string }>) => {
              window.open(
                file?.response?.cdnUrl ||
                  window.URL.createObjectURL(file.originFileObj),
              );
            }}
            itemRender={(originNode, file) => (
              <Row align="middle">
                <Col span={file?.response?.cdnUrl ? 22 : 24}>{originNode}</Col>
                {file?.response?.cdnUrl ? (
                  <Col span={2}>
                    <CopyToClipboard
                      text={file?.response?.cdnUrl}
                      onCopy={() => message.success('复制成功!')}
                    >
                      <Tooltip title={file?.response?.cdnUrl}>
                        <CopyOutlined className="__general_tools-drawer-upload-icon" />
                      </Tooltip>
                    </CopyToClipboard>
                  </Col>
                ) : null}
              </Row>
            )}
          >
            <SelectOutlined />
            <p className="__general_tools-compress-dragger-title">
              将WebP、JPEG和PNG图片拖放到这里
            </p>
          </Dragger>
        </Col>
      </Row>
      <AddGithubModal
        visible={modalVisible}
        mode={modalMode}
        onCancel={() => setModalVisible(false)}
        chooseGithub={getCurrentChooseGithub() as IGithubSetting}
        onOk={handleRepoSetting}
      />
    </div>
  );
};

export default DrawerBed;
