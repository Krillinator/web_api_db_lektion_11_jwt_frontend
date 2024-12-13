"use client"

import router from "next/router"

export default function Home() {
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

      console.log(response)

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
    }
  }

  return (
    <div>
      <button onClick={onSubmit}>Fetch</button>
    </div>
  )
}
