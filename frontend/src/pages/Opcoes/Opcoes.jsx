import "./Opcoes.css";

import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

const Opcoes = () => {
  const { id } = useParams();
  const [opcoes, setOpcoes] = useState([]);
  const [inputs, setInputs] = useState([""]);

  const getData = useCallback(async () => {
    await fetch(`http://localhost:3000/opcoes/findByEnquete/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setOpcoes(data.opcoes);
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  }, [id]);

  const addNewOpt = async () => {
    const opt = {
      opcoes: inputs,
      enquete_id: id,
    };

    await fetch("http://localhost:3000/opcoes/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(opt),
    }).catch((err) => {
      console.log(err);
    });

    await getData();
  };

  const deleteOpt = async (optId) => {
    await fetch(`http://localhost:3000/opcoes/delete/${optId}`, {
      method: "DELETE",
    })
      .then(() => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, [getData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    addNewOpt();

    setInputs([""]);
  };

  const handleDelete = (optId) => {
    deleteOpt(optId);
  };

  const addInput = (e) => {
    e.preventDefault();

    setInputs([...inputs, ""]);
  };

  const handleChange = (e, i) => {
    inputs[i] = e.target.value;

    setInputs([...inputs]);
  };

  return (
    <div className="opcao">
      <div className="navigation">
        <Link to={`/enquete/${id}`}>Voltar</Link>
      </div>
      <div>
        <label className="opcoes_list">Opções presentes:</label>
        <ul>
          {opcoes.map((opt) => (
            <li key={opt.Opcoes_Id}>
              {opt.Opcao}
              <button
                className="delete"
                onClick={() => handleDelete(opt.Opcao_Id)}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="opcao_form">
        <span>Adicionar opção(ões):</span>
        {inputs.map((inp, index) => (
          <label key={index}>
            <input
              name="opcao"
              type="text"
              value={inp}
              autoComplete="off"
              placeholder="Digite opção"
              onChange={(e) => handleChange(e, index)}
            />
          </label>
        ))}

        <div>
          <button type="submit" className="button_criar">
            Criar
          </button>
          <button onClick={addInput} className="button_criar">
            Adicionar Campo
          </button>
        </div>
      </form>
    </div>
  );
};

export default Opcoes;
