((): void => {
    "use strict";

    const init = () => {
        getAuthorsAsync();
        getCoursesSynchronous();
        setSpreadOperator(1, 2, 3, 4, 5, Math.random());
        getPolicyStatuses();
        getProductTypes();
    };

    const getCoursesSynchronous = () => {
        const url: string = 'http://pluralsightcourseviewer.azurewebsites.net/api/courseviewer/courses';

        fetch(url)
            .then(response => response.json())
            .then((response: App.models.ICourse[]) => {
                const generic: App.models.IGenericValue<App.models.ICourse> = new App.models.GenericValue(response, 5);
                console.log(generic);

                let results: string = `<h5><em>Total Count</em>: ${generic.Count}</h5>`;

                response.forEach(course => {
                    const newCourse = new App.models.Course(course.Author, course.AuthorId, course.CourseId, course.CourseName,
                        course.Description, course.Released, course.Summary);

                    results += `<p>${newCourse.Bio}</p>`;
                });

                document.getElementById('courses').innerHTML = results;
            })
            .catch(error => {
                console.error(error);
                return false;
            });
    };

    const getAuthorsAsync = async () => {
        const url: string = 'http://pluralsightcourseviewer.azurewebsites.net/api/courseviewer/authors';

        const response = await fetch(url);
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }

        const authors: App.models.IAuthor[] = await response.json();

        let results: string = '';

        authors.forEach(author => {
            results += `<p>${GetAuthor(`${author.FirstName}&nbsp;${author.LastName}`)} - ${GetAuthor(author.AuthorId)}</p>`;
        });

        document.getElementById('authors').innerHTML = results;
    };

    const setSpreadOperator = (...ids: number[]): void => {
        let spreadText = '<ul>';

        for (let id of ids) {
            spreadText += `<li>Number: ${id.toString()}</li>`;
        }

        spreadText += '</ul>';

        document.getElementById('spreads').innerHTML = spreadText;
    };

    const getPolicyStatuses = () => {
        let txt = '<ul>';

        for (var policyStatus in App.enums.PolicyStatusEnum) {
            txt += (`<li>Description: ${policyStatus}, Key: ${App.enums.PolicyStatusEnum[policyStatus]}</li>`);
        }

        txt += '</ul>';

        document.getElementById('policyStatuses').innerHTML = txt;

        //// Or if using JQuery...
        $('#policyStatuses').html(txt);
    };

    const getProductTypes = () => {
        let txt = '<ul>';

        for (var prodType in App.enums.ProductTypeEnum) {
            txt += (`<li>Description: ${prodType}, Key: ${App.enums.ProductTypeEnum[prodType]}</li>`);
        }

        txt += '</ul>';

        document.getElementById('productTypes').innerHTML = txt;
    };

    /* Method Overloading */
    function GetAuthor(author: string): string;
    function GetAuthor(id: number): string;
    function GetAuthor(property: any): string {
        let val: string = '';

        switch (typeof property) {
            case 'string':
                val = `Author Name: ${property}`;
                break;
            case 'number':
                val = `Author Id: ${property}`;
                break;
            default:
                break;
        }

        return val;
    };

    /* Sample to discuss adding custom typings for custom functions */
    const replaceSpaces = (word: string): string => {
        return word.toString().replaceAll(' ', '&nbsp;');
    };

    init();
})();


