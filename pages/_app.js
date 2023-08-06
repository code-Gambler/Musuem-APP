import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import RouteGuard  from "../components/RouteGuard";

export default function App({ Component, pageProps }) {
  return (
    <RouteGuard>
      <div className="global">
        <Layout>
          <SWRConfig
            value={{
              fetcher: async (url) => {
                const res = await fetch(url);
                if (!res.ok) {
                  const error = new Error(
                    "An error occurred while fetching the data."
                  );
                  error.info = await res.json();
                  error.status = res.status;
                  throw error;
                }
                return res.json();
              },
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>
        </Layout>
      </div>
    </RouteGuard>
  );
}
