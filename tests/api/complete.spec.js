const { test, expect } = require('@playwright/test')
const { generateRandomPost } = require('../../helper/fakeData')

test('@positive GET - Validate the posts response for success', async ({ request }) => {
  const response = await request.get(`/posts`)
  expect(response.status()).toBe(200)
  const body = await response.json()
  expect(Array.isArray(body)).toBe(true)
})

test('@negative GET - should return 404 for non-existent route', async ({ request }) => {
  const response = await request.get(`/posts_inexistente`)
  expect(response.status()).toBe(404)
})

test('@positive POST - Create a new post success', async ({ request }) => {
  const newPost = generateRandomPost()
  const response = await request.post(`/posts`, {
    data: newPost
  })

  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.title).toBe(newPost.title);
  expect(body.body).toBe(newPost.body);
  expect(body.userId).toBe(newPost.userId);
})

test('@positive PUT - Update existing post', async ({ request }) => {
  const updatedPost = generateRandomPost();

  const response = await request.put(`/posts/1`, {
    data: updatedPost
  })

  expect(response.status()).toBe(200)
  const body = await response.json()
  expect(body.title).toBe(updatedPost.title)
  expect(body.body).toBe(updatedPost.body)
})

test('@positive DELETE - Delete post', async ({ request }) => {
  const response = await request.delete(`/posts/1`)
  expect(response.status()).toBe(200)
  const body = await response.json()
  expect(body).toEqual({})
})

test('@negative PATCH - route that does not support the method', async ({ request }) => {
  const response = await request.patch('/comments') 
  expect(response.status()).toBeGreaterThanOrEqual(400)
})
