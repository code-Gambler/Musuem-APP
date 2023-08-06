import React from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { useRouter } from "next/router";
import styles from '@/styles/History.module.css';
import { Container, Card, ListGroup, Button } from "react-bootstrap";
import { removeFromHistory } from "@/lib/userData";

export default function SearchHistory() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  if(!searchHistory) return null;

  let parsedHistory = [];
  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  // This function must cause the user to navigate (using the "useRouter" hook) to the page
  const historyClicked = (e, index) => {
    router.push(`/artwork?${searchHistory[index]}`);
  };

  // The purpose of this function is to remove an element from the "searchHistory" list
  async function removeHistoryClicked(e, index){
    e.stopPropagation(); // stop the event from trigging other events
    setSearchHistory(await removeFromHistory(searchHistory[index])) 
  };

  return (
    <>
      <Container>
        {parsedHistory.length > 0 ? (
          <>
            <ListGroup>
              {parsedHistory.map((historyItem, index) => (
                <ListGroup.Item onClick={(e) => historyClicked(e, index)} className={styles.historyListItem} key={index}>
                  {Object.keys(historyItem).map((key) => (
                    <React.Fragment key={key}>
                      {key}: <strong>{historyItem[key]}</strong>&nbsp;
                    </React.Fragment>
                  ))}
                  <Button
                    className="float-end"
                    variant="danger"
                    size="sm"
                    onClick={(e) => removeHistoryClicked(e, index)}
                  >
                    &times;
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        ) : (
          <Card>
            <Card.Body>
              <h4>Nothing Here</h4>
              <p>Try searching for some artwork</p>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
}
