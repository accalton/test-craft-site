import { useHierarchicalMenu } from "react-instantsearch";
import { Fragment } from "react";

export default (props) => {
    const {
        items,
        isShowingMore,
        canToggleShowMore,
        canRefine,
        refine,
        sendEvent,
        toggleShowMore,
        createURL,
    } = useHierarchicalMenu(props);

    return (
        <>
            <List items={items} onNavigate={refine} />
        </>
    );
}

const List = ({ items, onNavigate }) => {
    return (
        <ul>
            {items.map((item) => (
                <Fragment key={item.value}>
                    <li
                        onClick={(event) => {
                            event.preventDefault();

                            onNavigate(item.value);
                        }}
                    >
                        {item.label}
                    </li>

                    {item.data && <List items={item.data} onNavigate={onNavigate} />}
                </Fragment>
            ))}
        </ul>
    );
}
