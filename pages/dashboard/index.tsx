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

Dashboard.getLayout = (page: ReactElement) => {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  );
}; 

export default Dashboard;