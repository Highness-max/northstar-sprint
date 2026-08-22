# Learning & Blocker Journal

## Day 1 — Webhooks

### Tool
Webhooks

### What I learned
I learned that a webhook allows one system to send an event notification to another system when an event occurs.

I also learned that a webhook can be used to update the status of a process asynchronously instead of waiting for the original request to complete.

### What I built
I created a Node.js/Express prototype with a webhook endpoint for receiving badge-printing confirmations.

The prototype receives a check-in request, keeps the attendee in a pending state, and then updates the attendee to checked in when the printer confirmation webhook is received.

### Blocker
I initially had difficulty understanding how the webhook confirmation changes the attendee's status and how the scan and printer confirmation should happen as separate steps.

### How I solved it
I tested the scan endpoint and webhook endpoint separately.

First, I sent a scan request for A001 and confirmed that the system returned:

"Check-in received. Waiting for printer confirmation."

I then sent a printer completion webhook for A001 and confirmed that the system changed the attendee to checked in.

### Result
The webhook successfully updated the attendee after the printer confirmation.

---

## Day 2 — Testing

### Tests completed

- A001 scan
- A001 printer confirmation webhook
- A001 duplicate scan
- A002 scan and confirmation
- A003 scan and confirmation
- Final attendee status check

### What I learned
I learned how an asynchronous workflow differs from waiting for an immediate response.

The attendee can remain pending after the initial scan and only become checked in after the printer sends a confirmation through the webhook.

### Main challenge
Understanding how to maintain the attendee's state between the initial scan and the webhook confirmation.

### How I solved it
I tested each stage separately and checked the attendee records after the webhook was received.

I also tested a duplicate scan after A001 was already checked in to make sure the system prevented another badge from being printed.

### Results

A001 was successfully checked in and showed PRINTED status.

A002 was successfully checked in and showed PRINTED status.

A003 was successfully checked in and showed PRINTED status.

A duplicate scan was successfully blocked with the message:

"Already checked in. No second badge will be printed."

### Final outcome
The prototype successfully demonstrated the asynchronous check-in flow and duplicate-scan protection.