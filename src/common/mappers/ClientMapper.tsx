import Client, { ClientValue } from "../../entities/Client";

class ClientMapper {
    static clientToSelector(client: Client): ClientValue {
        return ({
            key: client.id.toString(),
            label: <div>{`${client.name} (${client.phone})`}</div>,
            value: client.phone,
            client: client
            
        })
    }

    static clientsToSelector(clients: Client[]){
        console.log(clients);
        if(clients.length == 0) return [];
        return clients.map(client => this.clientToSelector(client));
    }
}

export default ClientMapper;