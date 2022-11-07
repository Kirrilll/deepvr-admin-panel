import {Room} from "./Room";

interface GameView{
    id: number;
    title: string;
    guest_min?: number;
    guest_max?: number;
    rooms: Room[];
}

export default GameView;