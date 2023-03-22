import { ReactElement } from "react";
import DashboardLayout from "@/pages/dashboard/layout";

const AdminManager = () => {
  return (
    <>Admin Manager Page</>
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