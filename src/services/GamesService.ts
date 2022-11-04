import GameView from "../entities/GameView";

class GamesService {

    //Здесь можно организовать сохранение игр в сессию, чтобы не делать доп. запросы



    private static isGameRoom(roomId: number, game: GameView): boolean{
        return Boolean( ~game.rooms.findIndex(room => room.id == roomId));
    }

    static filterByRoom(roomId: number | null, allGames: GameView[]):GameView[]{
        if(roomId === null) return allGames;
        return allGames.filter((game) => this.isGameRoom(roomId, game));
    }

    static filterByName(value: string, allGames: GameView[]):GameView[]{
        if(!Boolean(value)) return allGames; 
        return allGames.filter((game) => game.title.includes(value));
    }
}

export default GamesService;