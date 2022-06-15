import express from 'express';
import { connect } from './database/db';
import { router as adminRouter } from './module/admin/admin.router';
import { router as projectRouter } from './module/projects/project.router';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(express.static('public'));
app.use('/admin', adminRouter);
app.use('/projects', projectRouter);

export function start() {
    connect().then(() => {
        app.listen(port, () => {
            console.log("Listening on port 3000.")
        });
    })
}