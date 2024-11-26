import { ColumnDef } from "@tanstack/react-table";
// import { EditableCell } from "./EdittableCell";
// import { useMemo } from "react";

export const todoColumns: ColumnDef<TypeOfTodo>[] = [
    {
        header: '',
        accessorKey: 'select',
        cell: (info) => {
            const todo = info.row.original
            const meta = info.table.options.meta
            return (<input
            type='checkBox'
            checked={todo.isComplete}
            onChange={()=> meta?.onTodo(todo.id, 'isComplete', !todo.isComplete)}
        />)}
    },
    {
        header: "Task",
        accessorKey: "task", 
        cell: (info) => {
            const todo = info.row.original
            const meta = info.table.options.meta
            return (<input 
                type='text'
                value={todo.task}
                disabled={!todo.isEdittable || todo.isComplete}
                onChange={(e) => meta?.onTodo(todo.id, 'task', e.target.value)}
                onKeyDown={(e) => meta?.handleKeyDown(e.key, todo.id)}
                onCompositionStart={() => meta?.setIsComposing(true)}
                onCompositionEnd={() => meta?.setIsComposing(false)}
            />)
        }
    },
    { 
        header: ({column}) => {
            return (
                <div onClick={column.getToggleSortingHandler()}>
                    created at
                </div>
            )
        },
        accessorKey: "createdAt",
        cell: ({row}) => {
            const todo = row.original
            return `${todo.createdAt.getFullYear()}/${todo.createdAt.getMonth()+1}/${todo.createdAt.getDate()}`
        }
    },
    { 
        header: ({column}) => {
            return (
                <div onClick={column.getToggleSortingHandler()}>
                    due to
                </div>
            )
        },
        accessorKey: "limit",cell: ({row}) => {
            const todo = row.original
            return `${todo.limit.getFullYear()}/${todo.limit.getMonth()+1}/${todo.limit.getDate()}`
        }
    },
    { 
        header: "status", 
        accessorKey: "isComplete",
        cell: ({row}) => {
            const todo = row.original
            return todo.isComplete ? 'complete' : 'in progress'
        }
    },
    { 
        header: "", 
        accessorKey: "edit", 
        cell: (info) => {
            const todo = info.row.original
            const meta = info.table.options.meta
            return (<button
                disabled={todo.isComplete}
                onClick={()=>{meta?.onTodo(todo.id, "isEdittable", !todo.isEdittable)}}>{!todo.isEdittable?'edit':'cancel'}
            </button>)
        }
    },
    { 
        header: "", 
        accessorKey: "delete",
        cell: (info) => {
            const todo = info.row.original
            const meta = info.table.options.meta
            return (<button onClick={()=>{meta?.onDelete(todo.id)}}>delete</button>)
        }
    }
]