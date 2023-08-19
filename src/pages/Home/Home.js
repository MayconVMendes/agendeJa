import React, { useState, useEffect } from "react";
import NotebookSection from "./containers/notebookSection/notebookSection";
import WhatSchedule from "./containers/whatSchedule/whatSchedule";
import EverythingYouNeed from "./containers/everythingYouNeed/everythingYouNeed";
import SimpleScheduling from "./containers/simpleScheduling/simpleScheduling";
import useDisplayAllJobsFromAllEnterprises from "../../hooks/display/enterpriseJob/useDisplayAllJobsFromAllEnterprises";
import OurClients from "./containers/ourClients/ourClients";
import PhoneBook from "./containers/phoneBook/phoneBook";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import NewsLetter from "./containers/newsLetter/newsLetter";
import {
  Card,
  Stack,
  Heading,
  Text,
  Divider,
  Button,
  ButtonGroup,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function Home() {
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

  function handleNavigate(jobId) {
    navigate(`/service/details/${jobId}`);
  }

  return (
    <>
      {isUser ? (
        <div className="divDadUser">
          <div className="divControlCard">
            {isData &&
              isData.data?.map((job) => {
                return (
                  <Card maxW="sm" key={job.id}>
                    {" "}
                    <CardBody>
                      {/* <Image
                      src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      alt="Green double couch with wooden legs"
                      borderRadius="lg"
                    /> */}
                      <Stack mt="6" spacing="3">
                        <Heading size="md">{job.name}</Heading>
                        <Text>{job.portfolio.companyBranch.name}</Text>
                        <Text>{job.description}</Text>
                        <Text color="blue.600" fontSize="2xl">
                          R$ {job.price}
                        </Text>
                        <br /> <hr />
                        <Text>{job.portfolio.category.name}</Text>
                        <Text>{job.jobCategory.name}</Text>
                        <Text>
                          {
                            job.portfolio.companyBranch.address.neighborhood
                              .city.name
                          }
                          ,{" "}
                          {
                            job.portfolio.companyBranch.address.neighborhood
                              .city.state.nameAbbreviation
                          }
                        </Text>
                      </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                      <ButtonGroup spacing="2">
                        <Button
                          variant="solid"
                          colorScheme="blue"
                          onClick={() => handleNavigate(job.id)}
                        >
                          Saiba Mais
                        </Button>
                      </ButtonGroup>
                    </CardFooter>
                  </Card>
                );
              })}
          </div>
        </div>
      ) : (
        <>
          <SimpleScheduling />
          <WhatSchedule />
          <EverythingYouNeed />
          <NotebookSection />
          <OurClients />
          <PhoneBook />
          <NewsLetter />
        </>
      )}
    </>
  );
}
