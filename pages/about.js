import React, { useState } from "react";
import Layout from "../components/Layout";
import styles from "../components/component_styles/About.module.css";
import { Dangbo, Work, Help } from "../components/page_components/about_texts";

function About() {
  const [active, setActive] = useState(1);
  return (
    <Layout>
      <div className={styles.header}>
        <button
          onClick={() => {
            setActive(1);
          }}
        >
          DANGBO
        </button>
        <button
          onClick={() => {
            setActive(2);
          }}
        >
          OUR WORK
        </button>
        <button
          onClick={() => {
            setActive(3);
          }}
        >
          HOW YOU CAN HELP
        </button>
      </div>
      {active === 1 ? <Dangbo /> : active === 2 ? <Work /> : <Help />}
    </Layout>
  );
}

export default About;
