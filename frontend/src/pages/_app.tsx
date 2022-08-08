import { requestLogin } from "api/auth";
import axios from "axios";
import { Layout } from "components/layouts/Layout";

export default function App({ children }: { children: React.ReactNode }) {
  // axios.interceptors.request.use(
  //   (config) => {
  //     const token = localStorage.getItem("token");
  //     config.headers!.Authorization = `Bearer ${token}`;
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
  return (
    <Layout>
      {children}
      <button onClick={() => requestLogin("aa@naver.com", "1234")}>
        로그인
      </button>
    </Layout>
  );
}
