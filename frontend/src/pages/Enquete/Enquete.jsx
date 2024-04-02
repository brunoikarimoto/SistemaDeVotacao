import "./Enquete.css";

import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";

const Enquete = () => {
  const { id } = useParams();
  const [selected, setSelected] = useState();
  const [opcoes, setOpcoes] = useState([]);
  const [enquete, setEnquete] = useState([]);
  const [status, setStatus] = useState("");

  const getData = useCallback(async () => {
    const arr = [
      fetch(`http://localhost:3000/opcoes/findByEnquete/${id}`),
      fetch(`http://localhost:3000/enquete/find/${id}`),
    ];

    try {
      const res = await Promise.allSettled(arr);

      const successArr = [];

      res.map((obj) => {
        if (obj.status === "fulfilled") {
          successArr.push(obj.value);
        }
      });

      if (successArr.length == 0) {
        throw new Error("Todas requisições deram erradas!");
      }

      const data = await Promise.all(
        successArr.map((item) => {
          return item.json();
        })
      );

      setEnquete(data[1].enquete[0]);
      setOpcoes(data[0].opcoes);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

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

  const updateVoto = async (opcao) => {
    const opt = {
      votos: opcao.Votos + 1,
    };

    await fetch(`http://localhost:3000/opcoes/votos/${opcao.Opcao_Id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(opt),
    })
      .then(() => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });

    setSelected();

    alert("Voto computado com sucesso!");
  };

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    setStatus(getStatus(enquete.Inicio, enquete.Termino));
  }, [enquete]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let aux = opcoes.filter((op) => op.Opcao_Id == selected);

    updateVoto(aux[0]);
  };

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div className="enquete">
      <div className="navigation">
        <Link to={`/`}>Voltar</Link>
        <Link to={`/opcoes/add/${id}`}>Adicionar Opções</Link>
      </div>
      <h1>
        {enquete.Titulo} ({format(enquete.Inicio)} - {format(enquete.Termino)})
      </h1>
      <h2>{status}</h2>

      {opcoes.length >= 3 && (
        <form onSubmit={handleSubmit} className="enquete_form">
          <label>Opções:</label>
          {opcoes.map((opcao) => (
            <label className="opt" key={opcao.Opcao_Id}>
              <div>
                <input
                  type="radio"
                  value={opcao.Opcao_Id}
                  checked={selected == opcao.Opcao_Id}
                  onChange={handleChange}
                />
                {opcao.Opcao}
              </div>
              <span>Votos: {opcao.Votos}</span>
            </label>
          ))}

          {status === "Em andamento" ? (
            <button type="submit" className="vote">
              Votar
            </button>
          ) : (
            <button type="submit" disabled className="vote">
              Votar
            </button>
          )}
        </form>
      )}

      {opcoes.length < 3 && (
        <div className="invalido">
          <p>Adicione Opções para poder votar!</p>
          <p>
            No mínimo três opções devem ser adicionadas para poder votar nelas.
          </p>
        </div>
      )}
    </div>
  );
};

export default Enquete;
