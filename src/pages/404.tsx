import { Result, Button } from 'antd';
import { history } from 'umi';

const NotFound = () => {
  return (
    <div className="__general_tools-inner __general_tools-center">
      <Result
        status="404"
        title="404"
        subTitle="=。-  您访问的页面不存在."
        extra={
          <Button type="primary" onClick={() => history.push('/')}>
            回到首页
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
