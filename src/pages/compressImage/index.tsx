import { useState, useCallback, useEffect } from 'react';
import {
  Upload,
  Button,
  Form,
  Slider,
  Radio,
  message,
  Spin,
  Image,
  Progress,
  Table,
} from 'antd';
import type { UploadFile } from 'antd/lib/upload/interface';
import type { ColumnsType } from 'antd/es/table';
import { SelectOutlined } from '@ant-design/icons';
import Compressor from 'compressorjs';
import './index.less';

interface ICompressOptions {
  quality: number;
  convertSize: number;
}

interface IUploadFile extends UploadFile {
  compressFile?: Blob;
  downloadUrl?: string;
  previewUrl?: string;
}

const INITCOMPRESSOPTIONS = {
  quality: 0.8,
  convertSize: 5000000,
};

const Group = Radio.Group;
const FormItem = Form.Item;

const columns: ColumnsType<IUploadFile> = [
  {
    title: '原始图片',
    dataIndex: 'previewUrl',
    key: 'previewUrl',
    render: (previewUrl) => {
      return <Image src={previewUrl} />;
    },
  },
  {
    title: '压缩图片',
    dataIndex: 'downloadUrl',
    key: 'downloadUrl',
    render: (downloadUrl) => {
      return <Image src={downloadUrl} />;
    },
  },
  {
    title: '压缩后尺寸(B)',
    dataIndex: 'size',
    key: 'size',
    render: (size, record) => {
      return (record?.compressFile?.size || size) + 'B';
    },
  },
  {
    title: '压缩比率',
    dataIndex: 'size',
    key: 'size',
    render: (size, record) => {
      const compressSize = record?.compressFile?.size;
      const percent = compressSize
        ? Math.ceil((1 - compressSize / size) * 100)
        : 100;
      return (
        <Progress
          percent={percent}
          status={compressSize ? 'active' : 'exception'}
        />
      );
    },
  },
  {
    title: '操作',
    dataIndex: 'name',
    key: 'name',
    render: (name, { downloadUrl }) => {
      return (
        <>
          <Button
            disabled={!downloadUrl}
            type="link"
            download={name}
            href={downloadUrl}
          >
            下载图片
          </Button>
        </>
      );
    },
  },
];

const CompressImage = () => {
  const [isCompressing, changeIsCompressing] = useState<boolean>(false);
  const [fileList, setFileList] = useState<IUploadFile[]>([]);
  const [compressFileList, setCompressFileList] = useState<IUploadFile[]>([]);
  const [compressOptions, setCompressOptions] =
    useState<ICompressOptions>(INITCOMPRESSOPTIONS);

  useEffect(() => {
    fileList.length && startCompress();
  }, [fileList, compressOptions]);

  const handleCompress = useCallback(
    (file: IUploadFile, options?: ICompressOptions): Promise<IUploadFile> => {
      const payloadOptions = options || compressOptions;
      return new Promise((resolve, reject) => {
        new Compressor(file.originFileObj as File, {
          ...payloadOptions,
          success: (compressFile) => {
            const blob = new Blob([compressFile], {
              type: 'application/octet-stream',
            });
            const downloadUrl = window.URL.createObjectURL(blob);
            const previewUrl = window.URL.createObjectURL(file.originFileObj);
            resolve({
              ...file,
              compressFile,
              downloadUrl,
              previewUrl,
            });
          },
          error: (e) => {
            console.error(e);
            reject(e);
          },
        });
      });
    },
    [compressOptions],
  );

  const handleCompressorConfigChange = useCallback(
    (changeValues) => {
      const options = { ...compressOptions, ...changeValues };
      message.info('检测到配置变更, 正在为您重新压缩当前上传图片, 请稍候~');
      setCompressOptions(options);
    },
    [compressOptions, fileList],
  );

  const startCompress = useCallback(async () => {
    changeIsCompressing(true);
    const compressFileList: IUploadFile[] = [];
    for await (let i of fileList) {
      try {
        const compressFile = await handleCompress(i);
        compressFileList.push(compressFile);
      } catch (e) {
        compressFileList.push(i);
      }
    }
    changeIsCompressing(false);
    setCompressFileList(compressFileList);
  }, [fileList, compressOptions, handleCompress]);

  return (
    <div className="__general_tools-compress">
      <Spin spinning={isCompressing}>
        <div className="__general_tools-compress-top">
          <div className="__general_tools-inner">
            <p>注: 默认压缩上限大小为5MB, 若超过5MB的png会被自动转化为jpg</p>
            <Form
              initialValues={compressOptions}
              onValuesChange={handleCompressorConfigChange}
            >
              <FormItem
                label="压缩质量"
                name="quality"
                tooltip="数值越大, 质量越大, 压缩率越低"
              >
                <Slider min={0} max={1} step={0.2} />
              </FormItem>
              <FormItem
                label="文件限制"
                name="convertSize"
                tooltip="是否取消5MB文件限制"
              >
                <Group>
                  <Radio value={5000000}>5MB</Radio>
                  <Radio value={Infinity}>无上限</Radio>
                </Group>
              </FormItem>
            </Form>
            <Upload.Dragger
              multiple
              maxCount={20}
              showUploadList={false}
              accept=".png,.jpg,.jpeg,.PNG,.JPG,.JPEG"
              className="__general_tools-compress-dragger"
              beforeUpload={() => false}
              onChange={(info) => {
                setFileList(info.fileList);
              }}
            >
              <SelectOutlined />
              <p className="__general_tools-compress-dragger-title">
                将WebP、JPEG和PNG图片拖放到这里
              </p>
              <p className="__general_tools-compress-dragger-desc">
                最多20张图片
              </p>
            </Upload.Dragger>
            <p className="__general_tools-compress-dragger-title">
              _(:з」∠)_ 压缩效果没有保证, 理性使用
            </p>
          </div>
        </div>
        <div className="__general_tools-inner __general_tools-compress-table">
          <Table
            columns={columns}
            dataSource={compressFileList}
            rowKey={({ uid }) => uid}
            pagination={false}
          />
        </div>
      </Spin>
    </div>
  );
};

export default CompressImage;
