# DECISIONS

## Stack

used React + TS + Vite because fast to setup

backend Node + Express + TS because simple and familiar

---

## Storage

used local disk by multer because

faster for MVP, less setup than MinIO

but made it as service so can change later

---

## AI

used fake classifier (stub)

real API takes time and not needed for this task

but made it as service so can change later with gpt or cloud API


---

## Realtime

used polling because simpler and faster for MVP

websocket needs more setup and complexity, for backend and frontend, and for MVP polling is fine

--- 

## Infra

used Docker Compose for easy local setup and isolation of services