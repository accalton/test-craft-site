import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default () => {
    const InsightsApiUrl = "https://insights.algolia.io/1/events"
    const params = new URLSearchParams(window.location.search);

    const events = {
        events: [
            {
                "eventType": "conversion", // Required
                "eventName": "End of article reached", // Required
                "index": process.env.CRAFT_ENVIRONMENT + "-model-kits", // Required
                "objectIDs": [document.getElementById("entry-id").dataset.entryId], // Required
                "userToken": "anonymous-xxxxxx-xx-xxx-xxxxxx", // Required
                "queryID": params.get('qid'),
            }
        ]
    };

    const options = {
        headers: {
            "X-Algolia-Api-Key": process.env.ALGOLIA_SEARCH_API_KEY,
            "X-Algolia-Application-Id": process.env.ALGOLIA_APPLICATION_ID
        },
        method: 'POST',
        body: JSON.stringify(events)
    };

    const { ref, inView, entry } = useInView({
        triggerOnce: true
    });

    useEffect(() => {
        if (inView) {
            fetch(InsightsApiUrl, options)
                .then(res => res.json)
                .then(data => console.log(data));
        }
    }, [inView]);

    return <div ref={ref}></div>
}
