"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getData(items) {
    return items;
}
let cidade = ["ponta Grossa", "Castro", "Carambei"];
console.log(getData(cidade));
let latitude = [-25.0945, -24.7922, -24.9497];
console.log(getData(latitude));
let longitude = [-50.1633, -50.0117, -50.1016];
console.log(getData(longitude));
let newUser = [];
newUser.push({ id: 1, name: "Sofia", email: "sofia@gmail.com", isActive: true });
console.log(getData(newUser));
function getById(items, id) {
    return items.find(item => item.id === id);
}
newUser.push({ id: 2, name: "João Pedro", email: "joão@gmail.com", isActive: true }, { id: 3, name: "Regiane", email: "regiane@gmail.com", isActive: true }, { id: 4, name: "Franciane", email: "fran@gmail.com", isActive: false });
console.log(getById(newUser, 3));
console.log(getById(newUser, 6));
let produtos = [
    { id: 1, name: "teclado", price: 200, inStock: true, categories: ["perifericos", "acessorios"] },
    { id: 2, name: "mouse", price: 150, inStock: false, categories: ["perifericos", "acessorios"] },
];
console.log(getById(produtos, 2));
console.log(getById(produtos, 6));
//# sourceMappingURL=index.js.map