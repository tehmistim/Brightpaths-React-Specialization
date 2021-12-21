import { useState, useEffect, useRef } from 'react'

export const useFetch = (url, _options) => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [ error, setError] = useState(null)

  // use useRef to wrap an object/array argument
  //which is a useEffect dependency
  const options = useRef(_options).current
  //stops infinite loop of data fetching

  useEffect(() => {
      console.log(options)
      const controller = new AbortController()

        const fetchData = async () => {
            setIsPending(true)
            //loading happens before data is fetched

        try {
            const res = await fetch(url, { signal: controller.signal })
            if(!res.ok) {
              throw new Error(res.statusText)
            }
            const data = await res.json()
    
                setIsPending(false)
                setData(data)
                setError(null)
          } catch (err) {
              if (err.name === "AbortError") {
                  console.log('the fetch was aborted')
              } else {
                setIsPending(false)
                setError('Could not fetch the data')
              }
                
            // console.log(err.message)
          }
    
    } // end of fetchData function
          
        fetchData()

        return () => {
            controller.abort()
            // cleanup function using abort controller.  So that if you click a button while data is being fetched...it will not freeze the page and throw an error in the console.
        }
    
}, [url, options])
    
      return { data, isPending, error }
}