import {Roles} from '../../MiddleWare/auth.js'


export const EndPoints = {
    CreateItem : [Roles.User],
//     UserData : [Roles.Admin , Roles.User],
 }