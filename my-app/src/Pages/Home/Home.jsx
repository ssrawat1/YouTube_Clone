import React, { useState } from "react";
import "./Home.css";
import Sidebar from "../../ytComponents/Navbar/Sidebar/Sidebar";
import Feed from "../../ytComponents/Navbar/Feed/Feed";

function Home({ sidebar }) {
  const [category, setCategory] = useState(0);
  return (
    <>
      <Sidebar
        sidebar={sidebar}
        category={category}
        setCategory={setCategory}
      />
      <div className={`container ${sidebar ? "" : "large-container"}`}>
        <Feed category={category} />
      </div>
    </>
  );
}

export default Home;
