import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox } from "react-instantsearch";
import HierarchicalMenu from "./HierarchicalMenu";
import Hits from "./Hits";

export default () => {
    const algoliaClient = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_SEARCH_API_KEY);
    const searchClient = {
        ...algoliaClient,
        search(requests) {
            const newRequests = requests.map((request) => {
                // Ignore empty search requests in Analytics
                if (!request.params.query || request.params.query === '') {
                    request.params.analytics = false;
                }

                return request;
            });

            return algoliaClient.search(newRequests);
        }
    };

    return (
        <InstantSearch
            indexName={process.env.CRAFT_ENVIRONMENT + '-model-kits'}
            future={{
                preserveSharedStateOnUnmount: false
            }}
            searchClient={searchClient}
            insights={true}
        >
            <SearchBox />
            <HierarchicalMenu attributes={[
                'product-line.lvl0',
                'product-line.lvl1'
            ]} />
            <Hits />
        </InstantSearch>
    );
}