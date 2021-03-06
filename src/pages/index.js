import Layout from "../../components/Layout";
import { useCookies } from "react-cookie";

function Index() {
  const [name, seName, removeName] = useCookies(['name']);
  const [ck, seCk, removeCk] = useCookies(['ck']);
  const [test, setTest, removeTest] = useCookies(['test']);
  const handleClick = () => {
    console.log("btn");
    removeCk()
    removeName()
    removeTest()
  }
  
  return (
    <Layout>
      <h1 className="title">Anasayfa</h1>
      <h2 className="subtitle">Alt Başlık</h2>
      <p className="paragraph">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem cumque
        assumenda qui itaque reprehenderit dolore ipsum reiciendis nemo. Eius
        officiis illo provident velit, id ullam quod esse, ipsam magni, sunt
        harum. Iusto commodi tenetur quasi tempora debitis ipsam vel maxime
        autem, aliquam rem. Dolorum facere ea reprehenderit, rem laboriosam ad?
      </p>
      <button
          className="mg-medium button is-danger"
          onClick={handleClick}
        >
          Cookie temizlemek için tıkla
        </button>
    </Layout>
  );
}

export default Index;
