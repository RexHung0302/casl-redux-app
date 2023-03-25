import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import clsx from "clsx";
import Dashboard from "./dashboard";
import { LoadingOutlined } from "@ant-design/icons";
import DashboardLayout from "./dashboard/layout";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setAbility, setAuthState } from "@/store/reducers/authSlice";
import classes from "./index.module.css";

interface ILoginTestFuncProps {
  jwtToken: string;
  account: string;
}

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const loginTestHandler = async ({jwtToken, account}: ILoginTestFuncProps) => {
    setLoading(false);

    const res = await fetch("/api/login/testJwt", {
      method: "POST",
      body: JSON.stringify({
        jwtToken,
        account
      })
    });
    const { success, message: resMsg, data } = await res.json();
    
    if (success) {
      const { account: resAccount, permission } = data;
      dispatch(setAbility(permission));
      setLoading(false);
      dispatch(setAuthState(true));
      message.success(`${resAccount}, Welcome Back!`);
    } else {
      message.error(resMsg);
      router.push("/login");
    }
  };
  
  
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    const account = localStorage.getItem("account");
    if (!jwtToken || !account) {
      router.push("/login");
    } else {
      loginTestHandler({jwtToken, account});
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