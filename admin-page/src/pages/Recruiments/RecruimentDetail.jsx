import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdminContext } from "../../components/AdminContext/AdminContext";
import Recruiments from "./Recruiments";
import Lottie from "lottie-react";
import loading from "../../loadingAnimation/loading.json";

function RecruimentDetail() {
  const { idRecruiment } = useParams();
  const { detailJob, setDetailJob, getDetailRecruiment } =
    useContext(AdminContext);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const data = await getDetailRecruiment(idRecruiment);
          const detailJobLocal = JSON.parse(localStorage.getItem("detailJob"));
          console.log(detailJobLocal);
          const content = document.getElementById("content");
          content.innerHTML = `
          ${detailJobLocal.description}
          `;
          return
    };
    getData();
  }, [idRecruiment]);

  return (
    <div className="tableDetail">
      <Recruiments />

        <p className="content-description" id="content"></p>
    
    </div>
  );
}
export default RecruimentDetail;
