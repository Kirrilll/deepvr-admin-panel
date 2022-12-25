import { type } from "os";
import { CellView } from "../../entities/Cell";
import { CellIndeficator } from "../../features/timeline/redux/slice";

interface StoredData{
    lastSelectedItem: CellView,
    som: string,
    delayedActionName?: string
}

type KeyValue = keyof StoredData
type DataValue<T extends KeyValue> =  StoredData[T]

class StorageService{
    static instance: StorageService = new StorageService();
    private constructor(){};

    setItem<Key extends KeyValue>(key: Key, data: DataValue<Key>){
        const dataJson = JSON.stringify(data);
        sessionStorage.setItem(key, dataJson);
    }

    getItem<Key extends KeyValue>(key: Key): DataValue<Key> | null{
        let item = sessionStorage.getItem(key);
        if(item != null){
            return JSON.parse(item);
        }
        return null;
    }

}

export default StorageService;