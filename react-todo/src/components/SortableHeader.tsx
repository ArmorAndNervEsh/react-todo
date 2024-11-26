import { HeaderContext } from "@tanstack/react-table";

export const SortableHeader = (props:{title: string, info: HeaderContext<TypeOfTodo, unknown>}) => {
    const column = props.info.column
    return (
        <div onClick={column.getToggleSortingHandler()}>
            {props.title}{column.getIsSorted()?((column.getIsSorted()==='asc')?'^':'v'):''}
        </div>
    )
}