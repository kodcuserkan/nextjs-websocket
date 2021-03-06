import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Layout from "../../components/layout";

const Dashboard = () => {
  const router = useRouter();
  const [user] = useCookies("ck");
  const [socketUrl] = useState("wss://echo.websocket.org");
  const messageHistory = useRef([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!user.ck) router.push("/login");
  }, []);

  if (!user.ck) {
    return (
      <div>
        <h1>Yükleniyor...</h1>
      </div>
    );
  }

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  messageHistory.current = useMemo(
    () => messageHistory.current.concat(lastMessage),
    [lastMessage]
  );

  // const handleClickChangeSocketUrl = useCallback(
  //   () => setSocketUrl("wss://demos.kaazing.com/echo"),
  //   []
  // );

  const handleClickSendMessage = useCallback(() => sendMessage("Merhaba"), []);
  const handleClickSendFormMessage = (e) => {
    e.preventDefault();
    sendMessage(msg);
  };

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Bağlanıyor",
    [ReadyState.OPEN]: "Bağlantı sağlandı",
    [ReadyState.CLOSING]: "Kapatılıyor",
    [ReadyState.CLOSED]: "Kapatıldı",
    [ReadyState.UNINSTANTIATED]: "Bağlantı kurulamadı",
  }[readyState];

  return (
    <Layout>
      <h1 className="title">DASHBOARD</h1>
      <div>
        <h3>HAZIR MESAJ:</h3>
        <button
          className="button is-primary"
          onClick={handleClickSendMessage}
          disabled={readyState !== ReadyState.OPEN}
        >
          'Merhaba' demek için tıkla!
        </button>
        <br />
        <br />
        <h3>KENDİN YAZ:</h3>
        <form onSubmit={handleClickSendFormMessage}>
          <div class="field">
            <div class="control">
              <input
                class="input is-primary"
                type="text"
                placeholder="Kullanıcı adı"
                onChange={(e) => setMsg(e.target.value)}
              />
            </div>
          </div>
          <button className="button is-primary">Gönder</button>
        </form>
        <span>Websoket durumu: {connectionStatus}</span>
        <br />
        {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}

        <br />
        <br />
        <ul>
          {messageHistory.current.map((message, idx) => (
            <div key={idx}> Soketten gelen mesaj: {message?.data}</div>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  // Test için env değişkenleri  ve empty props
  let db = {
    host: process.env.DB_HOST || "",
    username: process.env.DB_USER || "",
    password: process.env.DB_PASS || "",
  };

  return {
    props: {
      empty: "true",
    },
  };
}

export default Dashboard;
