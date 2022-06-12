import express from 'express';
import { connect } from './database/db';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

export function start() {
    connect().then(() => {
        app.listen(port, () => {
            console.log("Listening on port 3000.")
        });
    })
}