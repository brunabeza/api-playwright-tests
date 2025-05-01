const { test, expect } = require('@playwright/test')

test('GET - Validate the posts response for success', async ({ request }) => {
  const response = await request.get(`/posts`)
  expect(response.status()).toBe(200)
  const body = await response.json()
  expect(Array.isArray(body)).toBe(true)
})

test('POST - Create a new post success', async ({ request }) => {
  const newPost = { title: 'Novo Post', body: 'Conteúdo do post', userId: 1 }
  const response = await request.post(`/posts`, {
    data: newPost
  })

  expect(response.status()).toBe(201)
  const body = await response.json()
  expect(body.title).toBe(newPost.title)
  expect(body.body).toBe(newPost.body)
  expect(body.userId).toBe(newPost.userId)
})

test('PUT - Update existing post', async ({ request }) => {
  const updatedPost = { title: 'Update Post', body: 'Update content', userId: 1 }
  const response = await request.put(`/posts/1`, {
    data: updatedPost
  })

  expect(response.status()).toBe(200)
  const body = await response.json()
  expect(body.title).toBe(updatedPost.title)
  expect(body.body).toBe(updatedPost.body)
})

test('DELETE - Delete post', async ({ request }) => {
  const response = await request.delete(`/posts/1`)
  expect(response.status()).toBe(200)
  const body = await response.json()
  expect(body).toEqual({})
})
