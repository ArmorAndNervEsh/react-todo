import { ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "./SortableHeader";


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
        header:  (info) => SortableHeader({title:"created at", info: info}),
        accessorKey: "createdAt",
        cell: ({row}) => {
            const todo = row.original
            return `${todo.createdAt.getFullYear()}/${todo.createdAt.getMonth()+1}/${todo.createdAt.getDate()}`
        }
    },
    { 
        header: (info) => SortableHeader({title:"due to", info: info}),
        accessorKey: "limit",
        cell: ({row}) => {
            const todo = row.original
            return `${todo.limit.getFullYear()}/${todo.limit.getMonth()+1}/${todo.limit.getDate()}`
        }
    },
    { 
        header: ({column}) => {
            return (
                <div onClick={
                    () => {
                        column.setFilterValue((old: boolean) => {
                            console.log(old)
                            switch(old) {
                            case true:
                                return false
                            case false:
                                return undefined
                            case undefined:
                                return true
                            default:
                                return undefined
                            }
                        })
                    }
                }>
                    status
                </div> 
            )
        },
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