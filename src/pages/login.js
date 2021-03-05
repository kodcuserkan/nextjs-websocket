import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Router from "next/router";
import Layout from "../../components/Layout";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [cookies, setCookie] = useCookies(["name"]);

  useEffect(() => {
    if (isLogin) {
      const Cookies = localStorage.coo;
      const ck = "test";
      setCookie("ck", ck);
      setCookie(ck, "ck-test");
      setCookie("name", name);
      window.sessionStorage.setItem("manager", "test-data");
      console.log("Credidentials: ", name, password, "cookies", cookies);
      Router.push("/dashboard");
      setIsLogin(false);
    }
  }, [isLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length > 0 && password.length > 0) setIsLogin(true);
  };

  return (
    <Layout>
      <h1 className="title">Giriş yapın</h1>
      <h2 className="subtitle">Aşağıdaki alanları doldurun</h2>
      <form
        className="form has-background-light center"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              className="input"
              id="username"
              placeholder="Kullanıcı adınız"
              onChange={(e) => setName(e.target.value)}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input
              className="input"
              id="password"
              type="password"
              placeholder="Şifreniz"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button className="button is-success">Login</button>
          </p>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
