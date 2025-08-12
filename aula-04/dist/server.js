"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3001;
let newUser = [
    { id: "1", name: "Sofia Mesquita", email: "sofia@gmail.com", isActive: true },
    { id: "2", name: "Regiane Mesquita", email: "regiane@gmail.com", isActive: false },
    { id: "3", name: "Johnatan Mesquita", email: "johnatan@gmail.com", isActive: true }
];
app.get('/users', (req, res) => {
    res.status(200).json(newUser);
});
app.get('/users/:id', (req, res) => {
    let userID = req.params.id;
    let foundUser = newUser.find(newUser => newUser.id === userID);
    res.status(200).json(foundUser);
});
app.post('/users', (req, res) => {
});
function addUser(user) {
    if (user && typeof user.id === 'string' && typeof user.name === 'string' && typeof user.email === 'string') {
        newUser.push(user);
        console.log(`Usuário ${user.name} adicionado com sucesso.`);
    }
    else {
        console.error("Dados do usuário inválidos. Certifique-se de que o objeto `user` corresponde à interface `IUser`.");
    }
}
const user = {
    id: "5",
    name: "João Pedro",
    email: "joao@gmail.com",
    isActive: true
};
addUser(user);
console.log(newUser);
app.put('/users/:id', (req, res) => {
    let userID = req.params.id;
    let UserUpdateData = req.body;
    res.status(200).json(UserUpdateData);
    console.log('Usuario atualizado com sucesso!');
});
app.delete('/users/:id', (req, res) => {
    let deleteUser = (req.params.id);
    let dadosdel = newUser.length;
    newUser = newUser.filter(IUser => IUser.id !== deleteUser);
    if (newUser.length < dadosdel) {
        res.status(200).send(`Usuario ${deleteUser} deletado!`);
    }
    else {
        res.status(404).send(`Uuario ${deleteUser} não encontrado!.`);
    }
});
app.listen(port, () => {
    console.log("Api iniciada na porta: " + port);
});
//# sourceMappingURL=server.js.map