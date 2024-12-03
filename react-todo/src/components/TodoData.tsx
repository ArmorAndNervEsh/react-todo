import { ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "./SortableHeader";
import { DateCell } from "./DateCell";

export const createTodoColumns = (
    handleKeyDown: (key: string, id: number)=>void,
    onTodo:<K extends keyof TypeOfTodo, V extends TypeOfTodo[K]>(id: number, key: K, val: V)=>void,
    onDelete: (id: number)=>void,
    setIsComposing: React.Dispatch<React.SetStateAction<boolean>>
): ColumnDef<TypeOfTodo>[] => [
    {
        header: '',
        accessorKey: 'select',
        cell: function( info) {
            const todo = info.row.original
            return (<input
            type='checkBox'
            checked={todo.isComplete}
            onChange={(e)=> {onTodo(todo.id, 'isComplete', e.target.checked)}}
        />)}
    },
    {
        header: "Task",
        accessorKey: "task", 
        cell: (info) => {
            const todo = info.row.original
            return (<input 
                type='text'
                value={todo.task}
                disabled={!todo.isEdittable || todo.isComplete}
                onChange={(e) => onTodo(todo.id, 'task', e.target.value)}
                onKeyDown={(e) => handleKeyDown(e.key, todo.id)}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
            />)
        }
    },
    { 
        header: (info) => SortableHeader({title:"created at", info: info}),
        accessorKey: "createdAt",
        cell: ({row}) => DateCell(row.original.createdAt)
    },
    { 
        header: (info) => SortableHeader({title:"due to", info: info}),
        accessorKey: "limit",
        cell: ({row}) => DateCell(row.original.limit)
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
            return (<button
                disabled={todo.isComplete}
                onClick={()=> onTodo(todo.id, "isEdittable", !todo.isEdittable)}>{!todo.isEdittable?'edit':'cancel'}
            </button>)
        }
    },
    { 
        header: "", 
        accessorKey: "delete",
        cell: (info) => {
            const todo = info.row.original
            return (<button onClick={()=> onDelete(todo.id)}>delete</button>)
        }
    }
]