const express = require("express");
const cors = require("cors");
const axios = require("axios");


const redis = require("redis");
// const client = redis.createClient({url : 'url of your production application'})
const redisClient = redis.createClient();
// terminal -> redis-server

const app = express();
app.get("/photos", async (req, res) => {
  const albumId = req.query.albumId;
  await redisClient.connect();
  console.log("object");
  const photos = await redisClient.get("photos");
//   const photos = await redisClient.get(`photoes?albumId=${albumId}`);
  if (photos != null) {
    console.log("hi");
    res.json(JSON.parse(photos));
  } else {
    console.log("hello");
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/photos",
      { params: { albumId } }
    );
    await redisClient.setEx("photos", 3600, JSON.stringify(data));
    // terminal -> redis-cli -> keys *
    res.json(data);
  }
  await redisClient.quit();
});]// renderHook - render custom hooks
import { renderHook, act } from '@testing-library/react'
// useCounter - custom hook
import { useCounter } from './useCounter'

describe('useCounter', () => {
  test('should render the initial count', () => {
    // result -> to access count property
    const { result } = renderHook(useCounter)
    expect(result.current.count).toBe(0)
  })

  test('should accept and render the same initial count', () => {
    // passing inital value to useCounter
    const { result } = renderHook(useCounter, {
      initialProps: { initialCount: 10 },
    })
    expect(result.current.count).toBe(10)
  })


  test('should increment the count', () => {
    const { result } = renderHook(useCounter)
    // act -> we cannot update any state without calling it inside the callback function of when testing
    // cannot do -> result.current.increment()
    act(() => result.current.increment())
    expect(result.current.count).toBe(1)
  })

  test('should decrement the count', () => {
    const { result } = renderHook(useCounter)
    act(() => result.current.decrement())
    expect(result.current.count).toBe(-1)
  })
})
  

// custom hook 
import { useState } from 'react'
import { UseCounterProps } from './userCouner.types'

export const useCounter = ({ initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount)
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  return { count, increment, decrement }
}


app.listen(8000, () => {
  console.log("server is up and running");
});
