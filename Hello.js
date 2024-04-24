// console.log("Hello World!");
// app.get('/hello', (req, res) => {res.send('Hello World!')})
// app.get('/hello', (req, res) => {res.send('Life is good!')})
// app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')})

// Function accepts app reference to express module to create routes here. We could have used the new arrow function syntax instead.
export default function Hello(app) {
    app.get('/hello', (req, res) => {
        res.send('Life is good!')
    });

    app.get('/', (req, res) => {
        res.send('Welcome to Full Stack Development!')
    });
}  