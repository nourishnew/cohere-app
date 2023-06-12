import logo from "./logo.svg";
import "./App.css";
import React, { Component, useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [jobDescription, setJobDescription] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCompanyNameChange = (event) => {
    setCompany(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  function generateDescription(role_, description_, company_) {
    if (
      role_.length === 0 ||
      description_.length === 0 ||
      company_.length === 0
    ) {
      return;
    }
    setJobDescription("");
    setLoading(true);
    const options = {
      method: "POST",
      url: "https://api.cohere.ai/v1/generate",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: "Bearer fk1ClVJ0YSdJdjUgGSKif3Dsl7eqrBnwnNmteMyf",
      },
      data: {
        model: "command",
        max_tokens: 300,
        return_likelihoods: "NONE",
        temperature: 0.9,
        k: 0,
        stop_sequence: [],
        prompt: `In 200 words,Generate a one line description, list of requirements and list of qualifications for a ${role} at a company named ${company} based on the following description.${description}`,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        console.log(response.data.generations[0].text.toString());
        const text = response.data.generations[0].text;
        const newText = text.split("\n").map((str) => <p>{str}</p>);
        setJobDescription(newText);
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(function () {
        setLoading(false);
      });
  }
  return (
    <div className="App-header">
      <div className="app-title">Generate job description for your company</div>
      <p className="app-title">
        Built using React.js and Cohere LLM APIs. Please hire me
      </p>
      <p>By Nourish Cherish, 4A Computer Engineering, University of Waterloo, ncherish@uwaterloo.ca</p>
      <input
        className="input-box"
        type="text"
        placeholder="Enter the company name"
        value={company}
        onChange={handleCompanyNameChange}></input>

      <textarea
        className="input-description"
        type="text"
        placeholder="Enter some facts about company from the About page of your company website or brief desription of the role"
        value={description}
        onChange={handleDescriptionChange}></textarea>
      <input
        className="input-box"
        type="text"
        placeholder="Enter the role your are hiring for"
        value={role}
        onChange={handleRoleChange}></input>

      <button
        onClick={() => {
          generateDescription(role, description, company);
        }}>
        Submit
      </button>
      {jobDescription.length > 0 && jobDescription ? (
        <div className="jobDescriptionContainer">
          <p>{jobDescription}</p>
        </div>
      ) : null}
    </div>
  );
}

export default App;
