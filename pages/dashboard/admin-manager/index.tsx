import { ReactElement } from "react";
import DashboardLayout from "@/pages/dashboard/layout";

const AdminManager = () => {
  return (
    <>管理者列表</>
  )
};

AdminManager.getLayout = (page: ReactElement) => {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
} 

export default AdminManager;