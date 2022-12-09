import { ArFSDataProvider } from "../types"

export class DriveDataProvider {
    constructor({driveID, walletAddress}:{driveID:string, walletAddress:string}){
        this.drive = driveID
        this.wallet = walletAddress
    }
}