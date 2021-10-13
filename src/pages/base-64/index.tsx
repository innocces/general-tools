import { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Typography,
  Upload,
  Alert,
  Tooltip,
  message,
  Image,
} from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import type { UploadFile } from 'antd/lib/upload/interface';

import { fileToBase64 } from '@/utils';

import './index.less';
const Base64 = () => {
  const [base64, setBase64] = useState<string>();
  const [file, setFile] = useState<UploadFile<any>>();

  useEffect(() => {
    if (file) {
      fileToBase64(file)
        .then((transform) => setBase64(transform[1]))
        .catch((e) => {
          message.error('转换错误, 请重新选择!');
        });
    }
  }, [file]);

  return (
    <div className="__general_tools-inner __general_tools-base">
      <Alert message="每次仅可转换一张图片" />
      <Row>
        <Col span={12} className="__general_tools-base-item">
          <Upload.Dragger
            className="__general_tools-base-item-fill"
            maxCount={1}
            beforeUpload={() => false}
            accept=".png,.jpg,.jpeg,.PNG,.JPG,.JPEG"
            showUploadList={false}
            onChange={({ file: changeFile }) => setFile(changeFile)}
          >
            <Image
              className="__general_tools-base-item-fill-img"
              width="95%"
              height="95%"
              src={base64 || '/images/base64.png'}
              preview={false}
            />
            <p>点击上传图片进行转换 ✨</p>
          </Upload.Dragger>
        </Col>
        <Col span={12} className="__general_tools-base-item">
          <CopyToClipboard
            text={base64}
            onCopy={() => message.success('复制成功!')}
          >
            <Tooltip title="点击复制结果">
              <Typography.Paragraph className="__general_tools-base-item-fill">
                <pre className="__general_tools-base-item-fill">
                  {base64 || '点击左侧上传图片进行转换'}
                </pre>
              </Typography.Paragraph>
            </Tooltip>
          </CopyToClipboard>
        </Col>
      </Row>
    </div>
  );
};

export default Base64;
