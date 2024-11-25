declare type TypeOfTodo = {
    task: string,
    readonly id: number,
    createdAt: Date,
    limit: Date,
    isComplete: boolean,
    isEdittable: boolean
};