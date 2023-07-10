import {useState, useEffect} from "react";
import Arweave from "arweave";
import ArweaveCompositeDataProvider from "../../services/ArweaveCompositeDataProvider";
import { ArFSClient } from "@atticusofsparta/arfs-lite-client";

function useArweaveCompositeDataProvider ({customArweave}:{customArweave?:Arweave}) {

    const [dataProvider, setDataProvider] = useState<ArweaveCompositeDataProvider | undefined>(undefined);

useEffect(()=> {

try {
        const arweave = customArweave ?? Arweave.init({
            host: "arweave.net",
            port: 443,
            protocol: "https",
        });
        const arFSClient = new ArFSClient(arweave);

        const arweaveCompositeDataProvider = new ArweaveCompositeDataProvider({arweave:customArweave, arFSClient});
        setDataProvider(arweaveCompositeDataProvider);
} catch (error) {
    console.error(error)
}   

},[customArweave])


    return dataProvider

}

export default useArweaveCompositeDataProvider;