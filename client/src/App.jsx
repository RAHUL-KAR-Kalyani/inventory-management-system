import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import MainLayout from './MainLayout'
import AddProduct from './components/product/AddProduct'
import UpdateProduct from './components/product/UpdateProduct'
import Products from './components/product/Products'
import Customers from './components/customer/Customers'
import AddCustomer from './components/customer/AddCustomer'
import UpdateCustomer from './components/customer/UpdateCustomer'
import Invoices from './components/invoice/Invoices'
import AddInvoice from './components/invoice/AddInvoice'
import UpdateInvoice from './components/invoice/UpdateInvoice'
import PrintInvoice from './components/invoice/PrintInvoice'
import Dashboard from './pages/Dashboard'
import Sale from './pages/Sale'
import { useEffect } from 'react'

function App() {
	useEffect(() => {
		document.title = "Inventory Billing System";
	}, []);
	const { user } = useSelector((store) => store.auth);


	const appRouter = createBrowserRouter([

		// PUBLIC ROUTES
		{
			path: "/login",
			element: !user ? <Login /> : <Navigate to="/" />,
		},
		{
			path: "/signup",
			element: !user ? <Signup /> : <Navigate to="/" />,
		},

		// PROTECTED ROUTES
		{
			// element: <MainLayout />,
			element: user ? <MainLayout /> : <Navigate to="/login" />,
			children: [
				// {
				// 	path: "/",
				// 	element: <Home />,
				// },
				{
					path: "/",
					element: <Dashboard />,
				},
				{
					path: "/profile",
					element: <Profile />,
				},
				{
					path: "/home",
					element: <Home />,
				},
				{
					path: "/login",
					element: <Login />,
				},
				{
					path: "/signup",
					element: <Signup />,
				},
				{
					path: "/products",
					element: <Products />,
				},
				{
					path: "/product/add-product",
					element: <AddProduct />,
				},
				{
					path: "/product/update-product/:id",
					element: <UpdateProduct />,
				},

				{
					path: "/customers",
					element: <Customers />,
				},
				{
					path: "/customer/add-customer",
					element: <AddCustomer />,
				},
				{
					path: "/customer/update-customer/:id",
					element: <UpdateCustomer />,
				}, ,

				{
					path: "/invoices",
					element: <Invoices />,
				},
				{
					path: "/invoice/add-invoice",
					element: <AddInvoice />,
				},
				{
					path: "/invoice/update-invoice/:id",
					element: <UpdateInvoice />,
				},
				{
					path: "/invoice/print-invoice/:id",
					element: <PrintInvoice />,
				},
				{
					path: "/sale",
					element: <Sale />,
				}
			]
		}

	]);

	return (
		<div>
			<RouterProvider router={appRouter} />
		</div>
	)
}

export default App
