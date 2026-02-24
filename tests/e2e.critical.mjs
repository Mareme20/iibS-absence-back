#!/usr/bin/env node
import assert from 'node:assert/strict';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api';
const E2E_EMAIL = process.env.E2E_EMAIL;
const E2E_PASSWORD = process.env.E2E_PASSWORD;

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, options);
  let body = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }
  return { res, body };
}

async function main() {
  // Health-like check
  const loginProbe = await request('/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'invalid@iibs.test', password: 'invalid' })
  });
  assert([400, 401].includes(loginProbe.res.status), `Unexpected status on login probe: ${loginProbe.res.status}`);

  if (!E2E_EMAIL || !E2E_PASSWORD) {
    console.log('E2E critical smoke passed (probe only). Set E2E_EMAIL/E2E_PASSWORD for authenticated flow.');
    return;
  }

  const login = await request('/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: E2E_EMAIL, password: E2E_PASSWORD })
  });

  assert.equal(login.res.status, 200, `Login failed: ${login.res.status}`);
  const token = login.body?.data?.token;
  assert(token, 'Missing token in login response');

  const classes = await request('/classes', {
    headers: { authorization: `Bearer ${token}` }
  });
  assert.equal(classes.res.status, 200, `Classes listing failed: ${classes.res.status}`);
  assert(Array.isArray(classes.body?.data), 'Classes response data should be an array');

  console.log('E2E critical flow passed.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

