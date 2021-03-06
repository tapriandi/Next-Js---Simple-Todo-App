import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Home() {
  const { register, handleSubmit, reset, setValue, setFocus, getValues } = useForm()
  const [ todos, setTodos ] = useState([])
  const [ idEdit, setIdEdit ] = useState()
  const [ onEdit, setOnEdit ] = useState(false)
  const [ showForm, setShowForm ] = useState(false)

  const createTodo = (td) => {
    if (onEdit) { // 11. reuse form input to edit
      let temp = [...todos] // 12. save temporary
      temp[idEdit].todo = getValues('todo') // 13. replace old value with new value
      setTodos(temp) // 14. set new todos
      setOnEdit(false) // 15. on edit false
      reset() // reset form
      setShowForm(false)
    } else {
      setTodos((e, index) => [...e, {'id': index+1, 'todo': td.todo}]) // 1. add todo to array of object
      reset() // reset form
    }
  }

  const updateTodo = (id) => {
    setOnEdit(true) // 9. 
    setIdEdit(id) // 10. set id want to edit
    setShowForm(true)  // 5. show form on edit
    setFocus('todo')

    let temp = [...todos] // 6. save temporary
    const currentTodo = temp[id].todo // 7. get current todo value
    setValue('todo', currentTodo) // 8. set todo value on form input
  }

  const deleteTodo = (id) => {
    let temp = [...todos] // 2. save todos value
    temp.splice(id, 1) // 3. remove one todo by index
    setTodos(temp) // 4. set new todos value
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Next JS | Super Simple Todo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-[500px] p-10 mt-5 bg-green-100 mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="py-5 text-lg font-bold text-green-600">Simple Todo</h1>
          <button className="text-xs px-2 hover:underline text-green-600"
            onClick={() => setShowForm(!showForm)}
          >{ showForm ? 'Hide Form': 'Create Todo'}</button>
        </div>

        { showForm &&
          <form className="flex mb-4 items-center" onSubmit={handleSubmit(createTodo)}>
            <input 
              type="text" 
              className="mr-5 w-full py-2 px-4 text-xs focus:border-green-200"
              {...register('todo', {required: true})}
            />
            <button className="text-xs px-2 hover:underline text-green-600">{onEdit ? 'Update' : 'Submit'}</button>
          </form>
        }
        
        <div className="pt-5 border-t border-green-600">
          { todos.map((e, index) => (
            <div className="flex py-2 items-center justify-between border-b border-green-300">
              <div className="flex text-xs items-start">
                <p className="pr-3">{index+1}.</p>
                <p>{e.todo}</p>
              </div>
              <div>
                <button className="text-xs px-2 hover:underline text-green-600" onClick={() => updateTodo(index)}>edit</button>
                <button className="text-xs px-2 hover:underline text-red-600" onClick={() => deleteTodo(index)}>delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
      
    </div>
  )
}
