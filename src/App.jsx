import React, { useState } from 'react'

const App = () => {

const [task, settask] = useState('')
const [des, setdes] = useState('')
const [newtask, setnewtask] = useState([])
const [edit, setedit] = useState(null)
const [search, setsearch] = useState(null)


  const submithandler = (e) => {
  e.preventDefault()
  if(task == '' || des == ''){
    alert('Please fill all the fields')
  }
  
  const data = {task, des}
  if(edit != null){
    let updatetask = [...newtask]

    updatetask[edit] = data
    setnewtask(updatetask)
    setedit(null)
  }
  else{
    setnewtask([...newtask, data])
  }
  settask('')
  setdes('')

}


const deletehandler = (i) => {
  let copytask = [...newtask]
  copytask.splice(i, 1)
  setnewtask(copytask)
}


const  edithandler = (i) => {
  setedit(i)
  settask(newtask[i].task)
  setdes(newtask[i].des)
  

}


const filterdTask = newtask.filter((t)=> {
  if(search == null){
    return t
  }
  else if(t.task.toLowerCase().includes(search.toLowerCase()) || t.des.toLowerCase().includes(search.toLowerCase())){
    return t
  }
  else{
    return null
  } 
})
  return (   
    <div className=' w-screen h-screen bg-zinc-900 text-2xl font-bold px-6 py-4 text-white'>

<div className='flex items-center justify-center m-8 px-3'>
  <input onChange={(e) => {
    setsearch(e.target.value)
  }} className='px-3 py-1 rounded' type='search' placeholder='Enter the Task'/>
</div>

      <form onSubmit={submithandler}>
            <input value={task} onChange={(e) => {
              settask(e.target.value)
            }} className='border-2 text-white px-4 py-2 m-4 rounded border-amber-100 ' 
            type='text' placeholder='Enter task Name'/>

             <input value={des} onChange={(e) => {
              setdes(e.target.value)
             }} className='border-2 text-white px-4 py-2 m-4 rounded border-amber-100 ' 
            type='text' placeholder='Enter Description'/>

             <input className='border-2 rounded border-emerald-100 px-4 py-2 mx-4 font-semibold' type='submit'/>
      </form>

 <div className='w-50 m-4 gap-4 px-4 py-2 flex items-center justify-center flex-col text-center'>
  {newtask.length > 0 ? (
    filterdTask.map((t, i)=> {
    return (
      <div key={i} className='border-2 border-emerald-100 rounded px-4 py-2 m-4'>
        <h1 className='text-xl font-bold'>{t.task}</h1>
        <p>{t.des}</p>

        <div className='flex items-center justify-center'>
          <button onClick={() =>{
            deletehandler(i)
          }} className='bg-red-400 text-white p-2 m-4 rounded font-semibold text-[20px]'> Delete </button>
        </div>

        <div>
          <button onClick={() => {
            edithandler(i)
          }} className='px-5 py-2 bg-black text-white rounded font-semibold'>Edit</button>
        </div>
      </div>
    ) 
   })
  ) : (
    <h1 className='text-2xl font-bold'>No Task Found</h1>
  )}
 </div>
  
    </div>
  )
}

export default App