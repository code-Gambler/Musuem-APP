import React from "react";
import { useState, useEffect } from 'react';
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "../store";
import { useRouter } from "next/router";
import { getFavourites, getHistory } from "@/lib/userData";
import { isAuthenticated } from "@/lib/authenticate";

const PUBLIC_PATHS = ['/register', '/login', '/', '/_error'];

export default function RouteGuard(props) {
    const [ favouritesList, setFavouritesList ] = useAtom(favouritesAtom);
    const [ searchHistory, setSearchHistory ] = useAtom(searchHistoryAtom);
    const [authorized, setAuthorized] = useState(false);
    const router = useRouter();

    async function updateAtoms() {
        setFavouritesList(await getFavourites()); 
        setSearchHistory(await getHistory());
    }    

    useEffect(() => {
        updateAtoms();
        authCheck(router.pathname);
        router.events.on('routeChangeComplete', authCheck);
        return () => {
        router.events.off('routeChangeComplete', authCheck);
        };
    }, []);

    function authCheck(url) {
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
          setAuthorized(false);
          router.push('/login');
        } else {
          setAuthorized(true);
        }
      }

    return <>{props.children}</>
}