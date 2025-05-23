const { test, expect } = require('@playwright/test')

test('GET - Validate the posts response for success', async ({ request }) => {
  const response = await request.get(`/posts`)
  
  expect(response.status()).toBe(200)
  
  expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

  const body = await response.json()
  expect(Array.isArray(body)).toBe(true)
})

test('GET - should return 404 for nonexistent endpoint', async ({ request }) => {
  const response = await request.get(`/posts_inexistente`)

  expect(response.status()).toBe(404)
  expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')

  const body = await response.json()
  expect(Array.isArray(body)).toBe(false)
})
