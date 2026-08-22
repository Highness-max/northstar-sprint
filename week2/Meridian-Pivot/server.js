const express = require("express");

const app = express();

app.use(express.json());

const attendees = {
    A001: {
        name: "John Kamau",
        checkedIn: false,
        printStatus: "NOT_REQUESTED"
    },
    A002: {
        name: "Mary Wanjiku",
        checkedIn: false,
        printStatus: "NOT_REQUESTED"
    },
    A003: {
        name: "David Otieno",
        checkedIn: false,
        printStatus: "NOT_REQUESTED"
    }
};

// Receive an attendee scan
app.post("/scan", (req, res) => {
    const { attendeeId } = req.body;

    const attendee = attendees[attendeeId];

    if (!attendee) {
        return res.status(404).json({
            message: "Attendee not found"
        });
    }

    // Prevent duplicate badge printing
    if (attendee.checkedIn) {
        return res.json({
            message: "Already checked in. No second badge will be printed.",
            attendee
        });
    }

    // Wait for the printer confirmation
    attendee.printStatus = "PENDING";

    console.log(`Print request created for ${attendeeId}`);

    res.json({
        message: "Check-in received. Waiting for printer confirmation.",
        attendee
    });
});

// Webhook endpoint
app.post("/webhook/print-complete", (req, res) => {
    const { attendeeId, status } = req.body;

    const attendee = attendees[attendeeId];

    if (!attendee) {
        return res.status(404).json({
            message: "Attendee not found"
        });
    }

    if (status === "printed") {
        attendee.printStatus = "PRINTED";
        attendee.checkedIn = true;

        return res.json({
            message: "Badge printed. Attendee checked in.",
            attendee
        });
    }

    attendee.printStatus = "FAILED";

    res.json({
        message: "Badge printing failed.",
        attendee
    });
});

// View all attendees
app.get("/attendees", (req, res) => {
    res.json(attendees);
});

app.listen(3000, () => {
    console.log("Meridian Pivot server running on http://localhost:3000");
});