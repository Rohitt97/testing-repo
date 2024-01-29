// const express = require('express');
// const Pusher = require('pusher');
// const cors = require('cors');

// const app = express();

// const pusher = new Pusher({
//     appId: "1743351",
//     key: "601475aebc168874cce3",
//     secret: "c11e1aac2ca0ba844095",
//     cluster: "ap2",
//     encrypted: true
// });

// //MiddleWare to parse the JSON Requests.
// app.use(express.json());
// app.use(cors());

// app.post('/test-notification', (req, res) => {
//     const { message } = req.body;
//     console.log(req.body);

//     if (!message) {
//         res.status(400).json({ error: "Message is required" });
//     }

//     pusher.trigger('test-channel', 'test-notification', {
//         message,
//     });

//     //Responding the success message.
//     res.send({ success: true, message: "Notification sent Successfully." });

// });

// app.listen(4000);

const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const pusher = new Pusher({
    appId: "1743351",
    key: "601475aebc168874cce3",
    secret: "c11e1aac2ca0ba844095",
    cluster: "ap2",
    encrypted: true
});

app.post('/message', (req, res) => {
    const { message } = req.body;

    // Trigger the 'new-message' event in the 'chat' channel
    pusher.trigger('chat', 'new-message', { message });

    res.status(200).send('Message sent');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});