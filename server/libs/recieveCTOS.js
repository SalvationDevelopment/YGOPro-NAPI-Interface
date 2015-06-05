/*jslint node: true */
var enums = require('./enums.js');


module.exports = function RecieveCTOS(packet) {
    'use strict';
    var todo = Object.create(enums.CTOSCheck),
        username,
        roomname,
        version;
//    if (packet.CTOS !== 'CTOS_TIME_COMFIRM' && packet.CTOS !== 'CTOS_RESPONSE') {
//        console.log(packet.CTOS, JSON.stringify(packet.message));
//    }
    switch (packet.CTOS) {
    case ('CTOS_PLAYER_INFO'):
        username = packet.message.toString('utf16le');
        username = username.split('\u0000'); // is this needed?
        //console.log('username', username[0]);
        todo.CTOS_PLAYER_INFO = username[0];
        break;
            
            
    case ('CTOS_JOIN_GAME'):
        //Player joined the game/server
        version = packet.message[0] + packet.message[1];
        roomname = packet.message.toString('utf16le', 8, 56);
        todo.CTOS_JOIN_GAME = roomname;
        //console.log('Version', version, 'roomname', roomname);
        break;
            
            
    case ('CTOS_HS_READY'):
        todo.CTOS_HS_READY = true;
        //console.log('CTOS_HS_READY', JSON.stringify(packet.message));
        break;
            
            
    case ('CTOS_HS_NOTREADY'):
        todo.CTOS_HS_NOTREADY = true;
        //console.log('not ready', packet.message);
        break;
            
            
    case ('CTOS_HS_TODUELIST'):
        todo.CTOS_HS_TODUELIST = true;
        //console.log('to duelist', packet.message);
        // subtract observer count, get duelist that is in new slot (join game.)
        break;
            
            
    case ('CTOS_HS_TOOBSERVER'):
        todo.CTOS_HS_TOOBSERVER = true;
        //console.log('to observer', packet.message);
        //get duelist that became observer
        break;
            

    case ('CTOS_LEAVE_GAME'):
        todo.CTOS_LEAVE_GAME = true;
        //console.log('leavegame', packet.message);
        //get duelist that left
        break;
            

    case ('CTOS_HS_START'):
        todo.CTOS_HS_START = true;
        break;
     
    case ('CTOS_TIME_COMFIRM'):
        //console.log('CTOS_TIME_COMFIRM',JSON.stringify(packet.message));
        break;
        
    case ('CTOS_RESPONSE'):
        //console.log('CTOS_RESPONSE', JSON.stringify(packet.message));
        break;
        
    default:
        //console.log(packet.CTOS);
    }
    return todo;
};
