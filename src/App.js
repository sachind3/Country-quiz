import { useEffect, useState } from "react";
import Footer from "./Footer";
// import { data } from "./questions";
import Quiz from "./Quiz";
const App = () => {
  const [data, setData] = useState([]);
  async function fetchData() {
    const res = await fetch(
      "https://restcountries.eu/rest/v2/all?fields=name;capital;flag;"
    );
    const data = await res.json();
    setData(data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Quiz questions={data} />
      <Footer />
    </>
  );
};

export default App;
