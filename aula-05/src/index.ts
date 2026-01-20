import express from 'express';

const app = express();
const PORT = 3000;

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

const users: User[] = [
    {
        id: 1, name: "Sofia", email:"sofia@exemple.com", age: 7
    },
    {
      id: 2, name: "Regiane", email:"Regiane@exemple.com", age:28
    }
]
app.use(express.json());
app.get('/users', (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});