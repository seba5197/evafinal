export interface BaseUserDTO{
firsName: string,
lastName: string,
email:    string,
level:   string
}

export interface UserDTO extends BaseUserDTO{
    id: number
   
}

export interface CreateUserDTO extends BaseUserDTO{
    password: string
}

export type UpdateUserDTO = Partial <CreateUserDTO> 

export interface LoginUserDTO extends BaseUserDTO{
    id:number,
    password: string

}

export interface UserTokenPayload {
sub:number,
email: string,
exp: number,
iat: number,
level: string
}