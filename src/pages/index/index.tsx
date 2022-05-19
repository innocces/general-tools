import { useCallback } from 'react';
import { Button, Row, Col, message } from 'antd';
import { history } from 'umi';
import { MENULIST } from '@/constant/menu';
import './index.less';

const Index = () => {
  const navigate = useCallback((href: string) => {
    history.push(href);
  }, []);

  const begin = useCallback(() => {
    message.info('如果我知道该给ta加点啥功能，那ta应该是有用的');
  }, []);

  return (
    <div className="__general_tools-layout-content">
      <div className="__general_tools-layout-content-banner">
        <div className="__general_tools-layout-content-banner-inner __general_tools-inner">
          <h1>General Tools</h1>
          <p>一个工具网站</p>
          <div className="__general_tools-layout-content-buttons">
            <Button type="primary" onClick={begin}>
              开始使用
            </Button>
          </div>
        </div>
      </div>
      <div className="__general_tools-inner __general_tools-list">
        <Row gutter={[16, 16]}>
          {MENULIST.map(({ icon, route, title, description }, index) => (
            <Col
              key={index}
              className="__general_tools-list-item"
              span={8}
              onClick={() => navigate(route)}
            >
              <img src={icon} />
              <h3>{title}</h3>
              <p>{description}</p>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Index;
