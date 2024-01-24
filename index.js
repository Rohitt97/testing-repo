const express = require('express');
const Pusher = require('pusher');
const cors = require('cors');

const app = express();

const pusher = new Pusher({
    appId: "1743351",
    key: "601475aebc168874cce3",
    secret: "c11e1aac2ca0ba844095",
    cluster: "ap2",
    encrypted: true
});

//MiddleWare to parse the JSON Requests.
app.use(express.json());
app.use(cors());

app.post('/test-notification', (req, res) => {
    const { message } = req.body;
    console.log(req.body);

    if (!message) {
        res.status(400).json({ error: "Message is required" });
    }

    pusher.trigger('test-channel', 'test-notification', {
        message,
    });

    //Responding the success message.
    res.send({ success: true, message: "Notification sent Successfully." });

});

app.listen(4000);