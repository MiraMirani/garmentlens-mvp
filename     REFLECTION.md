## Reflection

### What went well

Core flow worked well. Splitting services (storage, classifier and cloud) made things easier to manage.

### What was harder than expected

On the frontend side, organizing the UI and styling with Tailwind also took some time to get a clean and simple layout.

### What I would improve

I would  add basic tests, better logging, rate limiting on upload/API endpoints, and request limits because both AWS and GPT APIs can create cost risk.
For a larger version, I would move classification to a queue/worker setup like RabbitMQ instead of doing it in the request flow. WebSocket could also be useful later for live status updates, but polling is enough for this MVP.
I would also spend more time improving the UI/UX and frontend structure.