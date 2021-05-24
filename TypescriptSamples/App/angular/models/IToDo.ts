module App.models {
    export interface IToDo {
        Title: string;
        LastUpdated?: Date;
        Complete?: boolean;
    }

    export class ToDo implements IToDo {
        constructor(public Title: string,
            public LastUpdated?: Date,
            public Complete?: boolean) {
            this.Title = this.Title || null;
            this.LastUpdated = this.LastUpdated || new Date();
            this.Complete = this.Complete || false;
        }
    }
}