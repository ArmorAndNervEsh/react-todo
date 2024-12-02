import { ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "./SortableHeader";
import { DateCell } from "./DateCell";

type TodoColumnDef<T> = ColumnDef<T> & Partial<{
    handleKeyDown(key: string, id: number):void,
    onTodo<K extends keyof TypeOfTodo, V extends TypeOfTodo[K]>(id: number, key: K, val: V):void,
    onDelete(id: number):void,
    setIsComposing: React.Dispatch<React.SetStateAction<boolean>>
}>

export const todoColumns: TodoColumnDef<TypeOfTodo>[] = [
    {
        header: '',
        accessorKey: 'select',
        cell: function(/*this:TodoColumnDef<TypeOfTodo>,*/ info) {
            const todo = info.row.original
            return (<input
            type='checkBox'
            checked={todo.isComplete}
            onChange={(e)=> {
                if (this.onTodo) {
                    this.onTodo(todo.id, 'isComplete', e.target.checked)
                } else {
                    throw new Error('Function onTodo is not defined');
                }
            }}
        />)}
    },
    {
        header: "Task",
        accessorKey: "task", 
        cell: (info) => {
            const todo = info.row.original
            const customFunctions = todoColumns[0].customFunctions
            return (<input 
                type='text'
                value={todo.task}
                disabled={!todo.isEdittable || todo.isComplete}
                onChange={(e) => customFunctions && customFunctions.onTodo && customFunctions.onTodo(todo.id, 'task', e.target.value)}
                onKeyDown={(e) => customFunctions && customFunctions.handleKeyDown && customFunctions.handleKeyDown(e.key, todo.id)}
                onCompositionStart={() => customFunctions && customFunctions.setIsComposing && customFunctions.setIsComposing(true)}
                onCompositionEnd={() => customFunctions && customFunctions.setIsComposing && customFunctions.setIsComposing(false)}
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
            const customFunctions = todoColumns[0].customFunctions
            return (<button
                disabled={todo.isComplete}
                onClick={()=> customFunctions && customFunctions.onTodo && customFunctions.onTodo(todo.id, "isEdittable", !todo.isEdittable)}>{!todo.isEdittable?'edit':'cancel'}
            </button>)
        }
    },
    { 
        header: "", 
        accessorKey: "delete",
        cell: (info) => {
            const todo = info.row.original
            const customFunctions = todoColumns[0].customFunctions
            return (<button onClick={()=> customFunctions && customFunctions.onDelete && customFunctions.onDelete(todo.id)}>delete</button>)
        }
    }
]