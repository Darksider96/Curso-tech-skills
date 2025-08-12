interface IUser {
    id :number;
    name :string;
    email :string;
    isActive :boolean;
}

interface IProduct {
    id :number;
    name :string;
    price :number;
    inStock :boolean;
    categories :string[];
}



function getData<T> (items: T[]): T[] {
return items;
}

let cidade : string [] = ["ponta Grossa", "Castro", "Carambei"];
console.log(getData <string>(cidade))
let latitude : number [] = [-25.0945, -24.7922, -24.9497];
console.log(getData < number>(latitude))
let longitude: number [] = [-50.1633, -50.0117, -50.1016];
console.log(getData <number> (longitude))
let newUser: IUser [] = [];

newUser.push ({id: 1, name: "Sofia", email: "sofia@gmail.com", isActive: true});
console.log(getData <IUser>(newUser));


function getById<T extends {id: number}> (items: T[], id: number): T | undefined {
return items.find(item => item.id === id);
}

newUser.push(
    {id: 2, name: "João Pedro", email: "joão@gmail.com", isActive: true},
    {id: 3, name: "Regiane", email: "regiane@gmail.com", isActive:true},
    {id: 4, name: "Franciane", email: "fran@gmail.com", isActive:false}
);

console.log(getById<IUser>(newUser, 3));
console.log(getById<IUser>(newUser, 6));

let produtos: IProduct [] = [
    {id: 1, name: "teclado", price: 200, inStock: true, categories: ["perifericos", "acessorios"]},
    {id: 2, name: "mouse", price: 150, inStock: false, categories: ["perifericos", "acessorios"]},
]

console.log(getById<IProduct>(produtos, 2));
console.log(getById<IProduct>(produtos, 6));

