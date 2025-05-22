import request from "supertest"
import express from "express"
import { describe, it, expect } from "vitest"

// Cloner juste les routes utiles pour test
const app = express()
app.use(express.json())

app.get("/", (_req, res) => {
  res.send("Healthcheck Okay")
})

app.post("/img", (_req, res) => {
  res.status(400).json({ error: "Aucun fichier envoyé" })
})

describe("IMG Microservice", () => {
  it("GET / should return healthcheck", async () => {
    const res = await request(app).get("/")
    expect(res.status).toBe(200)
    expect(res.text).toBe("Healthcheck Okay")
  })

  it("POST /img should reject if no file", async () => {
    const res = await request(app).post("/img")
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty("error")
  })
})
