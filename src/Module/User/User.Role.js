import {Roles} from '../../MiddleWare/auth.js'


export const EndPoints = {
    Delete : [Roles.Admin],
    Update : [Roles.Admin , Roles.User],
    GetUsers : [Roles.Admin],
}