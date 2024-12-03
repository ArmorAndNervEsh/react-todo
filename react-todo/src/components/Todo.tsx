import { useState } from "react";
// import { useTable } from 'react-table'
import { ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { createTodoColumns } from "./TodoData";

export default function Todo(props: {
    todos: TypeOfTodo[],
    onTodo<K extends keyof TypeOfTodo, V extends TypeOfTodo[K]>(id: number, key: K, val: V):void,
    onDelete(id: number):void
}) {
    const [isComposing, setIsComposing] = useState(false);

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const injectedTodoColumuns = createTodoColumns(
            (key: string, id: number) => {
                if (key === 'Enter' && !isComposing) {
                    props.onTodo(id, "isEdittable", false)
                }
            },
            props.onTodo,
            props.onDelete,
            setIsComposing
    )

    const table = useReactTable({
        data: props.todos,
        columns: injectedTodoColumuns,
        columnResizeMode: 'onChange',
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        defaultColumn: {
          size: 400,
        },
        state: {
            sorting,
            columnFilters
        }
    });
        
    return (
    <>
        <table>
            <thead>
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                    {header.isPlaceholder ? null : (
                        <div>
                        {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                        )}
                        </div>
                    )}
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
            <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                    <th key={header.id}>
                    {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.footer,
                            header.getContext(),
                        )}
                    </th>
                ))}
                </tr>
            ))}
            </tfoot>
        </table>
    </>
    )
}