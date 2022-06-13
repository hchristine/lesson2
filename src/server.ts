import express from 'express';
import { connect } from './database/db';
import { router as adminRouter } from './module/admin/admin.router';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use('/admin', adminRouter);

export function start() {
    connect().then(() => {
        app.listen(port, () => {
            console.log("Listening on port 3000.")
        });
    })
}