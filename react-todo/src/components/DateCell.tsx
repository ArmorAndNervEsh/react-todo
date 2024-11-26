export const DateCell = (date:Date) => {
    return (
        <div style={{minWidth: '100px',textAlign: "center"}}>
            {date.getMonth()+1}/{date.getDate()}
        </div>
    )
}