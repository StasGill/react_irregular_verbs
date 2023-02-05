import React, { useState } from "react";
import Container from "../components/container/Container";
import { Input } from "../components/input/Input";
import { verbs } from "../data/verbs";
import "./home.css";

const Home = () => {
  const [value, setValue] = useState("");
  return (
    <Container>
      <h1>IRREGULAR VERBS</h1>
      <Input value={value} onChange={setValue} />
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
            .filter((item) => item.base_form.includes(value))
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
