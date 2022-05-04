export interface BasetaskDTO{
id?: number,
title: string,
content: string,
done: boolean,
userID: number


}

export interface taskDTO extends BasetaskDTO{
    
}

export interface CreatetaskDTO extends BasetaskDTO{

}

export interface UpdatetaskDTO extends Partial <BasetaskDTO>{}

