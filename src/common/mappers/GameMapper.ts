import { Game, GameResponse } from "../../entities/Game";
import GameView from "../../entities/GameView";


class GameMapper {

    static fromEntity(game: Game): GameView {
        return ({
            id: game.id,
            title: game.title,
            guest_max: game.guest_max ?? game.game_type.guest_max,
            guest_min: game.guest_min ?? game.game_type.guest_min,
            rooms: game.rooms
        })
    }

    static gamesFromEntities(games: GameResponse): GameView[] {
        return games.map(game => GameMapper.fromEntity(game));
    }


}

export default GameMapper;