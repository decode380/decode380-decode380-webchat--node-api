
export const isMongoDBId = (id) => {
    if( !(/^[a-fA-F0-9]{24}$/.test(id)) ) return false;
    else return true;
}