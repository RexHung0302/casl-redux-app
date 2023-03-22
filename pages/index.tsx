import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import clsx from "clsx";
import Dashboard from "./dashboard";
import { LoadingOutlined } from "@ant-design/icons";

import classes from "./index.module.css";
import DashboardLayout from "./dashboard/layout";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      router.push("/login");
    } else {
      setLoading(false);
    };
  }, [router]);

  return (
    <>
      {
        loading ? (
          <div className={clsx("flex items-center justify-center flex-col", classes.main)}>
            <LoadingOutlined spin className="text-lg" />
            <label className="text-lg mt-2">Loading...</label>
          </div>
        ) : <Dashboard />
      }
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return (
    <DashboardLayout>
      {page}
    </DashboardLayout>
  )
} 

export default Home;