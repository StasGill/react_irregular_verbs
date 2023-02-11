import React, { useState } from "react";
import { Button } from "../components/button/Button";
import Container from "../components/container/Container";
import { Input } from "../components/input/Input";
import { verbs } from "../data/verbs";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  const feature = true;
  return (
    <Container>
      <h1 className="logo">IRREGULAR VERBS</h1>
      <Input
        value={value}
        onChange={setValue}
        placeholder="Type to find here"
      />
      {feature && (
        <Button text="Training" onClick={() => navigate("/training")} />
      )}
      <table className="table">
        <thead className="thead">
          <tr>
            <td className="head_td">Base Form</td>
            <td className="head_td">Past Simple (V2)</td>
            <td className="head_td">Past Participle (V3)</td>
          </tr>
        </thead>
        <tbody>
          {verbs
            .filter((item) => item.base_form.includes(value.toLowerCase()))
            .map((data) => {
              return (
                <tr className="tbody" key={data.base_form}>
                  <td className="td">{data.base_form}</td>
                  <td className="td">{data.past_simple}</td>
                  <td className="td">{data.past_participle}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Container>
  );
};

export default Home;
