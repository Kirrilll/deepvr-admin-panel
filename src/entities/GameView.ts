import { LabeledValue } from "antd/lib/select";
import {Room} from "./Room";

interface GameView{
    id: number;
    title: string;
    guest_min?: number;
    guest_max?: number;
    price: number,
    rooms: Room[];
}



export type GameValue = LabeledValue | {game: GameView}

export default GameView;