import { useHits } from "react-instantsearch";
import Hit from "./Hit";

export default (...props) => {
    const { hits, results, sendEvent } = useHits(props);

    return (
        <section>
            {hits.map((hit) => (
                <Hit hit={hit} key={hit.objectID} sendEvent={sendEvent} />
            ))}
        </section>
    )
}
