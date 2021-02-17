import * as express from 'express';
 
const app = express();
 
app.get('/hello', (request, response) => {
  response.send("how's it going?");
});
 
app.listen(5000, () => {
    console.log("Runnning on port 5000")
});

export default app;