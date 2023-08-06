import React from 'react';
import useSWR from 'swr';
import Card from 'react-bootstrap/Card';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';

export default function ArtworkCardDetail({ objectID }) {
    // Get a reference to the favourites list
    const [ favourites, setFavourites ] = useAtom(favouritesAtom);
    // Changes button if the value is in favourites already
    const [ showAdded, setShowAdded ] = useState(false);

    useEffect(()=>{
        setShowAdded(favourites?.includes(objectID));
    }, [favourites]);

    // Make a call to the museum API using the objectID passed as props to this component
    // Using conditional fetching: Use null or pass a function as key to conditionally fetch data. If the function throws or returns a falsy value, SWR will not start the request.
    const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);

    // To be invoked when the button is clicked
    async function favouritesClicked() {
        // If the "showAdded" value in the state is true, then we must remove this piece of artwork from the favourites list.  
        if (showAdded) {
            setFavourites(await removeFromFavourites(objectID));
            setShowAdded(false);
        } else {
            setFavourites(await addToFavourites(objectID));
            setShowAdded(true);
        }
    }

    // Throw an error if the API request fails
    if (error) {
        return <Error statusCode={404} />;
    } else {
        // Validate the data
        if (!data || data.length === 0) {
            return null;
        }
        else {
            return (
                <Card className='hero-card' style={{ width: '100%' }}>
                    {data.primaryImageSmall && <Card.Img variant="top" src={data.primaryImage} />}
                    <Card.Body>
                        {data.title ? <Card.Title className='card-title'>{data.title}</Card.Title> : <Card.Title>N/A</Card.Title> }
                        <Card.Text>
                        <b>Date: </b>{data.objectDate ?<>{data.objectDate} </>: N/A } <br />
                        <b>Classification: </b>{data.classification ?<>{data.classification} </>: <>N/A</> } <br />
                        <b>Medium: </b>{data.medium ?<>{data.medium} </>: <>N/A</> } <br />
                        <b>Artist: </b>{data.artistDisplayName ? <>{data.artistDisplayName} <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">Wiki</a>   </> : <>N/A</> } <br />
                        <b>Credit Line: </b>{data.creditLine ? <>{data.creditLine}</> : <>N/A</> } <br />
                        <b>Dimensions: </b>{data.dimensions ? <>{data.dimensions}</> : <>N/A</> } <br />
                            {showAdded ? <Button onClick={favouritesClicked} variant='primary'>+ Favourite (added)</Button> : <Button onClick={favouritesClicked} variant='outline-primary'>+ Favourite</Button>}
                        </Card.Text>
                    </Card.Body>
                </Card>
            );
        }
    }
}