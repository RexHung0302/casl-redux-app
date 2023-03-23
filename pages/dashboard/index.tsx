import DashboardLayout from "@/pages/dashboard/layout";
import { NextPageWithLayout } from "../_app";
import { ReactElement, useEffect, useState } from "react";
import router from "next/router";
import { LoadingOutlined } from "@ant-design/icons";

const Dashboard: NextPageWithLayout = () => {
  return (
    <span>Dashboard</span>
  );
};

// Dashboard.getLayout = (page: ReactElement) => {
//   const [routerLoading, setRouterLoading] = useState(false);

//   useEffect(() => {
//     const handleRouteChangeStart = () => {
//       setRouterLoading(true);
//     };

//     const handleRouteChangeEnd = () => {
//       setRouterLoading(false);
//     };

//     router.events.on('routeChangeStart', handleRouteChangeStart);
//     router.events.on('routeChangeComplete', handleRouteChangeEnd);
//   }, [])
  
//   return (
//     <DashboardLayout>
//       {
//         routerLoading ? (
//           <div className="flex items-center justify-center flex-col w-full h-full">
//             <LoadingOutlined spin className="text-lg" />
//             <label className="text-lg mt-2">Loading...</label>
//           </div>
//         ) : page
//       }
//     </DashboardLayout>
//   )
// } 

Dashboard.getLayout = (page: ReactElement) => {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
} 

export default Dashboard;