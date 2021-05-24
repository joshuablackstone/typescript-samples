module App.models {
    export interface ICourse {
        Author: App.models.IAuthor;
        AuthorId: number;
        CourseId: number;
        CourseName: string;
        Description: string;
        Released: Date;
        Summary: string;
        Bio: string;
    }

    export class Course implements ICourse {
        public Bio: string;
        constructor(public Author: App.models.IAuthor,
            public AuthorId: number,
            public CourseId: number,
            public CourseName: string,
            public Description: string,
            public Released: Date,
            public Summary: string) {
            this.Bio = `Course Name: ${this.CourseName}<br />
                        By: <em>${this.Author.FirstName}&nbsp;${this.Author.LastName}</em><br />
                        Description: ${this.Description}`;
        }
    }
}