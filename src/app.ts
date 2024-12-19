import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express()
const port = 5000

// parsers
app.use(express.json());
app.use(cors());

app.get('/', (req:Request, res:Response) => {
    res.send('Blog Management Backend Software Application!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})