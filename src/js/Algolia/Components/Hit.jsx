export default ({ hit, sendEvent }) => {
    let url = hit.url;
    if (hit.__queryID) {
        url += "?qid=" + hit.__queryID;
    }

    return (
        <a href={url} onClick={() => {
            sendEvent('click', hit, 'Page viewed');
        }}>
            <article>
                <img src={hit.image} alt={hit.title} />
                <h3>{hit.title}</h3>
                <p>{hit['product-line']['lvl1']}</p>
            </article>
        </a>
    );
}
