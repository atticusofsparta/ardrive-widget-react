import { SEARCH_TYPES } from "../types";
import { ARFS_ID_REGEX, ARNS_TXID_REGEX } from "./constants";

export function checkSearchType(props: string) {
 try {
     if (ARFS_ID_REGEX.test(props)) {
       return SEARCH_TYPES.ARFS_ID;
     }
     if (ARNS_TXID_REGEX.test(props)) {
       return SEARCH_TYPES.ARWEAVE_WALLET_ADDRESS;
     }
   }
 catch (error) {
  console.error(error)
 }
}

export function isArweaveTransactionID(id?:string) {
  if (!id){
    return false;
  }

  return ARNS_TXID_REGEX.test(id);
}

export function isArFSID(id?:string) {
  if (!id){
    return false;
  }
  
    return ARFS_ID_REGEX.test(id);
  }

