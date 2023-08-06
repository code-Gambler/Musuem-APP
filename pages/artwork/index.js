import validObjectIDList from "@/public/data/validObjectIDList.json";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Error from "next/error";
import Pagination from "react-bootstrap/Pagination";
import Card from "react-bootstrap/Card";
import ArtworkCard from "@/components/ArtworkCard";

const PER_PAGE = 12;

export default function ArtHome() {
  const paginationbuttons = {
    display: "flex",
    justifyContent: "center",
  };
  const router = useRouter();
  let query = router.asPath.split("?");
  let finalQuery = query[1];

  // Add the artworkList and page to the state
  let [artworkList, setArtworkList] = useState(null);
  let [page, setPage] = useState(1);
  console.log("final", finalQuery);
  // Make a call to the museum API using the objectID passed as props to this component
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
  );

  // Create a 2D array of data for paging that is set in the state
  useEffect(() => {
    if (data != null && data != undefined) {
      // This has the effect of eliminating objectIDs from our search results that are not in the validObjectIDList
      let filteredResults = validObjectIDList.objectIDs.filter((x) =>
        data.objectIDs?.includes(x)
      );
      let results = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  useEffect(() => {
    console.log("Artwork List:", artworkList);
  }, [artworkList]);

  const nextPage = () => {
    if (page < artworkList.length) {
      setPage(++page);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(--page);
    }
  };

  if (error) {
    return <Error statusCode={404} />;
  } else {
    if (!artworkList) {
      return null;
    }
  }
  return (
    <>
      <Container>
        {artworkList.length > 0 ? (
          <>
            <Row className="gy-4">
              {artworkList[page - 1].map((currentObjectID) => (
                <Col lg={3} key={currentObjectID}>
                  <ArtworkCard objectID={currentObjectID} />
                </Col>
              ))}
            </Row>
            <Row>
              <Col>
                <br />
                <br />
                <Pagination style={paginationbuttons}>
                  <Pagination.Prev onClick={previousPage} />
                  <Pagination.Item>{page}</Pagination.Item>
                  <Pagination.Next onClick={nextPage} />
                </Pagination>
              </Col>
            </Row>
          </>
        ) : (
          <Card>
            <Card.Body>
              <h4>Nothing Here</h4>
              <p>Try searching for something else.</p>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
}
