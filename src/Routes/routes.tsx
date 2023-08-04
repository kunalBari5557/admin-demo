import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loader } from '../Components/GoBack';
import AdminLoginMiddleware from '../Components/Middleware/Admin/login';
import AdminLogin from '../pages/Login/login';
import AdminMiddleware from '../Components/Middleware/Admin';
import AdminLayout from '../Layout/Admin_Dashboard';
import AdminDashboard from '../pages/Dashboard';
import ProductList from '../pages/ProductList/ProductList';
import UsersManagement from '../pages/UsersManagement/UsersManagement';
const Admin_Routes = () => {

    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<Loader />} /> */}
                <Route element={<AdminLoginMiddleware />}>
                    <Route path="/" element={<AdminLogin />} />
                </Route>
                <Route element={<AdminMiddleware />}>
                    <Route element={<AdminLayout />} path="/admin/">
                    <Route path="users" element={<UsersManagement />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="product" element={<ProductList />} />
                    </Route>

                </Route>
            </Routes>
        </BrowserRouter>
    )

}
export default Admin_Routes