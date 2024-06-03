import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import {
  ProductOutlined,
  FileOutlined,
  BarsOutlined,
  MoneyCollectOutlined,
  TagsOutlined,
} from '@ant-design/icons';
import './SideBar.css';

const { Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();


  return (
    <Sider
      className="sideBar custom-scrollbar"
      theme="light"
      style={{ minHeight: '100vh', fontSize: '16px',overflowY:'auto',overflowX:'hidden'}}
    >
      <div className='logoContainer'>
        <Link to="/home" style={{ textDecoration: 'none', color: '#AA22D9' }}>
        <img src="/Evolution.png" alt="Evolution" title="Evolution"  className="AdminSidebar-logo"/>
        </Link>
      </div>
      <Menu
        theme="light"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['3']}
        mode="inline"
        style={{ fontSize: '16px',width: '20vw'}} // Set font size for the menu
      >
        
        <SubMenu key="1" icon={<ProductOutlined  style={{fontSize:collapsed?"2rem":"1.5rem",marginRight:"0.6vw"}} />} title="Products">
          <Menu.Item key="1-1">
          <FontAwesomeIcon icon={faCircle} style={{ marginRight: '8px', fontSize: '0.5rem',marginRight:"0.6vw"}} />
            <Link to="products">Product list</Link>
          </Menu.Item>
          <Menu.Item key="1-2">
          <FontAwesomeIcon icon={faCircle} style={{ marginRight: '8px', fontSize: '0.5rem',marginRight:"0.6vw"}} />
            <Link to="productsReviews">Product reviews</Link>
          </Menu.Item>
        </SubMenu>
       
        <SubMenu key="2" icon={<BarsOutlined  style={{fontSize:collapsed?"2rem":"1.5rem",marginRight:"0.6vw"}}/>} title="Categories">
  <Menu.Item key="2-1">
    <FontAwesomeIcon icon={faCircle} style={{ marginRight: '8px', fontSize: '0.7rem',marginRight:"0.6vw"}} />
    <Link to="categories">Category list</Link>
  </Menu.Item>
  <Menu.Item key="2-2">
    <FontAwesomeIcon icon={faCircle}style={{ marginRight: '8px', fontSize: '0.7rem',marginRight:"0.6vw"}}/>
    <Link to="categoryTypes">Category types</Link>
  </Menu.Item>
</SubMenu> 
<SubMenu key="3" icon={<FileOutlined style={{fontSize:collapsed?"2rem":"1.5rem",marginRight:"0.6vw"}}/>} title="Orders">
  <Menu.Item key="3-1">
    <FontAwesomeIcon icon={faCircle} style={{ marginRight: '8px', fontSize: '0.7rem',marginRight:"0.6vw"}} />
    <Link to="orders">Order list</Link>
  </Menu.Item>
</SubMenu>

        <Menu.Item key="4" icon={<TagsOutlined style={{fontSize:collapsed?"2rem":"1.5rem",marginRight:"0.6vw"}}/>}>
          <Link to="Customers">Customers</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<MoneyCollectOutlined  style={{fontSize:collapsed?"2rem":"1.5rem",marginRight:"0.6vw"}}/>}>
          <Link to="sellers">Sellers</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<MoneyCollectOutlined  style={{fontSize:collapsed?"2rem":"1.5rem",marginRight:"0.6vw"}}/>}>
          <Link to="users">Users</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
