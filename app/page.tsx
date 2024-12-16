"use client"

import { useState } from "react"
import Spinner from "./_component/Spinner"

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  /** TODO
   *    #1 - Fetch
   *    #2 - Fetch backend endpoint (different origin)
   *    #3 - Investigate potential issues (CORS)
   *    #4 - CORS implementation (override)
   */

  async function onSubmit() {
    try {
      // Create the body to send in the POST request
      const createUrlEncodedBody = new URLSearchParams({
        username: "Kristoffer",
        password: "abcdefgh",
      })

      // Timeout Setup
      const controller = new AbortController()
      const signal = controller.signal

      // Load
      setIsLoading(true)

      // Post
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: createUrlEncodedBody,
        signal,
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })

      // Bad Credentials
      if ((await response.status) == 401) {
        console.log(response.text())

        return
      }

      // SUCCESS
      const data = await response.text() // Get the token from the response
      console.log("Login successful:", data)

      // Redirect
      // router.push("/")
    } catch (error) {
      console.error("Error occurred during login:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <button onClick={onSubmit}>
        Fetch <Spinner loadingState={isLoading}></Spinner>
      </button>
    </div>
  )
}
