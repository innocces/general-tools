import { useCallback } from 'react';
import { Button, Row, Col } from 'antd';
import { history } from 'umi';
import { MENULIST } from '@/constant/menu';
import './index.less';

const Index = () => {
  const navigate = useCallback((href: string) => {
    history.push(href);
  }, []);

  return (
    <div className="__general_tools-layout-content">
      <div className="__general_tools-layout-content-banner">
        <div className="__general_tools-layout-content-banner-inner __general_tools-inner">
          <h1>General Tools</h1>
          <p>一个工具网站</p>
          <div className="__general_tools-layout-content-buttons">
            <Button type="primary">开始使用</Button>
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
