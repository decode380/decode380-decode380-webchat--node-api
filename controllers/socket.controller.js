import { decodeToken } from "../helpers/jwt.helper.js";

const users = [];

export const socketEvents = (socket, io) => {
    const token = socket.handshake.query['token'];
    let userId = null;
    let intervalToken = null;

    tokenChecking(socket, token)
        .then(({id, interval}) => {
            socket.join(id);
            userId = id;
            intervalToken = interval;
            console.log(`connected user ${userId}`)
        });
    
    // socket.on('send_msg', async(message) => {
    //     try {
    //         const { id: senderId } = await decodeToken(token);
    //         console.log('message' + senderId)

    //         const insertMessageId = await insertMessageToDb({ ...message, senderId }); 
    //         socket.to(message.receiverId)
    //             .emit('receive_msg', { 
    //                 id: insertMessageId,
    //                 message: message.message, 
    //                 from: senderId
    //             });

    //     } catch (error) {
    //         socket.emit( 'error_msg', error.message );
    //     }
    // });

    socket.on('disconnect', () => {
        console.log(`disconnected user ${userId}`)
        clearInterval(intervalToken);
    });

};


const tokenChecking = (socket, token) => new Promise(resolve => {

    decodeToken(token)
        .then(({id}) => {

            const interval = setInterval(() => {
                decodeToken(token).catch(err => {
                    socket.emit('connect_error_token', err);
                    socket.disconnect();
                });
            }, 180000);

            resolve({id, interval})
        })
        .catch(err => {
            // console.log(`${err}: ${token}`);
            socket.emit('connect_error_token', err);
            socket.disconnect();
        });

});
