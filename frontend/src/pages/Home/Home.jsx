import "./Home.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [enquetes, setEnquetes] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/enquete/list")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEnquetes(data.enquetes);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, []);

  const format = (date) => {
    let data = new Date(date);

    let aux = "";
    aux += data.getDate();
    aux += "/" + (data.getMonth() + 1);
    aux += "/" + data.getFullYear();

    return aux;
  };

  const getStatus = (inicio, termino) => {
    let i = new Date(inicio);
    let t = new Date(termino);
    let hoje = new Date();

    if (hoje <= t && hoje >= i) {
      return "Em andamento";
    } else if (hoje > t) {
      return "Finalizada";
    } else {
      return "Não iniciada";
    }
  };

  return (
    <div className="home">
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Início</th>
            <th>Término</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {enquetes &&
            enquetes.map((enquete) => (
              <tr
                key={enquete.ID}
                onClick={() => navigate(`/enquete/${enquete.ID}`)}
              >
                <td>{enquete.Titulo}</td>
                <td>{format(enquete.Inicio)}</td>
                <td>{format(enquete.Termino)}</td>
                <td>{getStatus(enquete.Inicio, enquete.Termino)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
