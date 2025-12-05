import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Coverage from "../Pages/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../Pages/Rider/Rider";
import SendParcel from "../Pages/SendParcel/SendParcel";
import Loading from "../Pages/Loading";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import Myparcels from "../Pages/DashBoard/Myparcels";
import Payment from "../Pages/DashBoard/Payment/Payment";
import PaymentSuccess from "../Pages/PaymentSuccess";
import PaymentCancelled from "../Pages/PaymentCancelled";
import PaymentHistory from "../Pages/DashBoard/PaymentHistory";
import ApproveRider from "../Pages/DashBoard/ApproveRider";
import UsersManagement from "../Pages/DashBoard/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../Pages/DashBoard/AssignRiders";
import RiderRoute from "./RiderRoute";
import AssignedDeliveries from "../Pages/DashBoard/AssignedDeliveries";
import CompletedDeliveries from "../Pages/DashBoard/CompletedDeliveries";
import ParcelTrack from "../Pages/ParcelTrack";
import DashBoardHome from "../Pages/DashBoard/DashBoardHome/DashBoardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,

    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("/servicecenters.json").then((res) => res.json()),
      },
      {
        path:'parcel-track/:trackingId',
        Component:ParcelTrack
      },
      {
        path: "/rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
        loader: () => fetch("/servicecenters.json").then((res) => res.json()),
      },

      {
        path: "/send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("/servicecenters.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index:true,
        Component:DashBoardHome
      },
      {
        path: "my-parcels",
        Component: Myparcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-canceled",
        Component: PaymentCancelled,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      // rider only routes
      {
        path:'assigned-deliveries',
        element:<RiderRoute><AssignedDeliveries></AssignedDeliveries></RiderRoute>
      },
       {
        path:'completed-deliveries',
        element:<RiderRoute><CompletedDeliveries></CompletedDeliveries></RiderRoute>
      },

      // admin only routes
      {
        path: "approve-rider",
        element: (
          <AdminRoute>
            <ApproveRider></ApproveRider>
          </AdminRoute>
        ),
      },

      {
        path: "assign-riders",
        element: (
          <AdminRoute>
           <AssignRiders></AssignRiders>
          </AdminRoute>
        ),
      },
      {
        path: "users-management",
        
        element: (
          <AdminRoute>
            <UsersManagement></UsersManagement>
          </AdminRoute>
        ),
      },
    ],
  },
]);
