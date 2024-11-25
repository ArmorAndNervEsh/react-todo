import { useState } from "react";
// import { useTable } from 'react-table'
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { todoColumns } from "./TodoData";

export default function Todo(props: {
    todos: TypeOfTodo[],
    onTodo<K extends keyof TypeOfTodo, V extends TypeOfTodo[K]>(id: number, key: K, val: V):void,
    onDelete(id: number):void
}) {
    const [isComposing, setIsComposing] = useState(false);

    const table = useReactTable({
        data: props.todos,
        columns: todoColumns,
        columnResizeMode: 'onChange',
        getCoreRowModel: getCoreRowModel(),
        defaultColumn: {
          size: 400,
        },
        meta: {
            handleKeyDown: (key: string, id: number) => {
                if (key === 'Enter' && !isComposing) {
                    props.onTodo(id, "isEdittable", false)
                }
            },
            onTodo: <K extends keyof TypeOfTodo, V extends TypeOfTodo[K]>(id: number, key: K, val: V) => props.onTodo(id, key, val),
            onDelete: (id:number) => props.onDelete(id),
            setIsComposing: (isComposing: boolean) => setIsComposing(isComposing)
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