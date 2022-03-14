import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import DashboardContainer from '../Modules/Dashboard/Container/DashboardContainer';
import HeaderComponent from './Header';
import InventoryContainer from '../Modules/Inventory/Container/InventoryContainer';
import { Layout } from 'antd';
import SupplierContainer from '../Modules/Supplier/Container/SupplierContainer';
import { ToastContainer } from 'react-toastify';

const { Content } = Layout;
const DisplayComponent = (params) => {
  const { noHeader, WrappedComponent } = params || {};
  return (
    <>
      {!noHeader && <HeaderComponent />}
      <Layout style={{ backgroundColor: '#fff' }}>
        <Content>
          <WrappedComponent {...params} />
        </Content>
      </Layout>
    </>
  );
};

const Navigation = (props) => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <DisplayComponent
                WrappedComponent={DashboardContainer}
                {...props}
              />
            }
          />
          <Route
            exact
            path="/suppliers"
            element={
              <DisplayComponent
                WrappedComponent={SupplierContainer}
                {...props}
              />
            }
          />
          <Route
            exact
            path="/inventories"
            element={
              <DisplayComponent
                WrappedComponent={InventoryContainer}
                {...props}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default Navigation;
