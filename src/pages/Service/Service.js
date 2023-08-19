/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import useDisplayAllJobsFromAllEnterprises from "../../hooks/display/enterpriseJob/useDisplayAllJobsFromAllEnterprises";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Service() {
  const [isData, setIsData] = useState(false);
  const [isUser, setIsUser] = useState(false);
  let count = 0;
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.userDados?.role);
  const { displayAllJobsFromAllEnterprises } =
    useDisplayAllJobsFromAllEnterprises();

  useEffect(() => {
    if (userData === "USER") {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [userData]);

  useEffect(() => {
    if (count === 0) {
      async function searchAllJobsFromAllEnterprises() {
        let resultAllJobs = await displayAllJobsFromAllEnterprises();
        // let subCategoryBody = await displaySubCategoryByCatId(id);
        setIsData(resultAllJobs);
        // setIsVerifica(true);
        // setIsSubCategoryName(subCategoryBody?.data.name);
      }
      searchAllJobsFromAllEnterprises();
      count++;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return <div>Você chegou!</div>;
}
