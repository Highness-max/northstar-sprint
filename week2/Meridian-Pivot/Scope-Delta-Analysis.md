# Scope Delta Analysis

## Client

Solstice Events Co.

## Original Flow

The original system used a synchronous REST API.

Scan QR
→ Call badge printer
→ Wait for response
→ Show Checked In

The kiosk depended on the printer response before completing the check-in process.

## Pivot

The synchronous printer API was deprecated.

The system therefore had to move to an asynchronous workflow.

The new flow is:

Scan QR
→ Create print request
→ Printer processes the request
→ Show Pending
→ Printer completion webhook
→ Update attendee status
→ Show Checked In

## Dropped

- Synchronous printer API
- Waiting for an immediate printer response
- Immediate "Checked In" status after the scan

## Modified

- Check-in workflow
- Attendee status management
- Printer communication
- Duplicate-scan handling

## Added

- Pending state
- Webhook endpoint
- Print completion callback
- Asynchronous check-in workflow

## Reprioritized

The team prioritized the asynchronous workflow because the original synchronous printer API was being deprecated.

Webhook handling and attendee state management became important parts of the new workflow.

## Regression Check

The updated prototype was tested with three attendees.

- A001 was successfully processed and showed PRINTED status.
- A002 was successfully processed and showed PRINTED status.
- A003 was successfully processed and showed PRINTED status.
- A duplicate scan of A001 was prevented from creating a second badge-print request.
- The attendee remained pending until the printer completion webhook was received.

## Trade-offs

The asynchronous approach avoids depending on the deprecated synchronous API.

However, it requires additional state management and webhook handling because the check-in process is completed in separate stages rather than through one immediate response.