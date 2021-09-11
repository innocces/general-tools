import { Upload, Button } from 'antd';
import { SelectOutlined } from '@ant-design/icons';
import Compressor from 'compressorjs';
import './index.less';

const CompressImage = () => {
  return (
    <div className="__general_tools-compress">
      <div className="__general_tools-compress-top">
        <div className="__general_tools-inner">
          <Upload.Dragger
            maxCount={20}
            accept="image/*"
            className="__general_tools-compress-dragger"
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
    </div>
  );
};

export default CompressImage;
