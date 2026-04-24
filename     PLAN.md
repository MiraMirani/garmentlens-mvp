# PLAN


At first, I try to separate MVP scope from future ideas.

Then, I split features into 4 groups:

- Must:  without these app doesn’t work
- Should:important but can skip
- Could:  only if I have time
- Won’t:  not useful now or too complex

After that I make a rough time plan, and also think about risks and some questions.

### Must
- upload image
- store image
- save data in DB
- run fake AI on it
- show list of garments
- show classification result in list

### Should
- simple file validation (not sure if I have time)
- error handling

### Could
- loading indicator while classifying
- making UI nicer with some CSS
- using Real AI (cloud or gpt) instead of stub
- storing image in (S3 or MinIO) instead of local disk
- add test

only if I finish early

### Won't
- auth
- payments
- mobile apps
- websockets (polling is fine for MVP)
- blockchain

---

## Time (rough guess)

- setup project: ~30 min
- backend upload: ~1.5 h
- frontend: ~1.5 h
- fixing bugs: ~30 min

not super accurate

---

## Risks

- Docker setup might take time if I run into issues
- local disk storage is not ideal, but ok for MVP
- easy to spend too much time on UI instead of core features
---

## Questions

- is polling enough or do you expect realtime updates?
- should users be able to edit AI result?
- should images be stored long-term or temporary?