const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "your-email@gmail.com",
            pass: "your-email-password",
        },
    });

    try {
        await transporter.sendMail({
            from: email,
            to: "your-email@gmail.com",
            subject: `Portfolio Contact Form Submission`,
            text: `Message from ${name}: ${message}`,
        });

        res.status(200).send("Message sent successfully.");
    } catch (error) {
        res.status(500).send("Error sending message.");
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
