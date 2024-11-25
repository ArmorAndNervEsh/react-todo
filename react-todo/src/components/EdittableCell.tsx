import { useState } from "react";

export const EditableCell = () => {
  const [value, setValue] = useState("")
  return <input value={value} onChange={e => setValue(e.target.value)} />
}