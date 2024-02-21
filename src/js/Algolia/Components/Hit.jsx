export default ({ hit, sendEvent }) => {
    return (
        <a href={hit.url} onClick={() => {
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
