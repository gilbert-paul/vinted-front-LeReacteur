const Input =({title, content, type, name, handle, value, setValue})=>{
  return(
    <>
    {type === "checkbox"?
    <div >
    <input  onChange={handle} id={name} name={name} type={type} placeholder={content} checked={value} />
    <label htmlFor={name}>{title}</label>
    </div>
    :
    <div>
    <label htmlFor={name}>{title}</label>
    <input id={name} onChange={handle} name={name} type={type} placeholder={content} value={value}/>
    
    </div>
    }
  </>
  )
}

export default Input