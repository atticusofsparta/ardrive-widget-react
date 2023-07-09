import {ArFSClientType, ArFSClient} from '@atticusofsparta/arfs-lite-client'
import { ArFSDataProvider, DriveStructure, GqlQueryTagArray, GqlResultTagArray, TagsObject } from "../types";
import Arweave from "arweave";
import { isArFSID, isArweaveTransactionID } from "../utils/searchUtils";
import { entityQuery } from "./arweave";

class ArweaveCompositeDataProvider implements ArFSDataProvider {

      _arweave: Arweave;
     _ArFSClient: ArFSClientType;

    constructor({
        arweave, 
        arFSClient 
    }: { 
        arweave?: Arweave, 
        arFSClient?: ArFSClientType 
    }) {
        this._arweave = arweave ?? Arweave.init({
            host: 'arweave.net',
            port: 443,
            protocol: 'https',
            });
        this._ArFSClient = arFSClient ?? new ArFSClient(this._arweave)
    }

    // ArFSDataProvider



}


export default ArweaveCompositeDataProvider;