$(() => {
    const serviceUrl = 'http://pluralsightcourseviewer.azurewebsites.net/api/courseviewer/courses';
    let courses: App.models.ICourse[] = [];

    const init = () => {
        $.getJSON(serviceUrl).then((response: App.models.ICourse[]) => {
            courses = (response || []).map(course => {
                const newCourse = new App.models.Course(course.Author, course.AuthorId, course.CourseId, course.CourseName,
                    course.Description, course.Released, course.Summary);

                return newCourse;
            });
        }).fail(error => console.error(error))
            .done(() => {
                console.log(courses);
                displayCourses(courses);
            });
    };

    const displayCourses = (courseList: App.models.ICourse[]) => {
        let coursesList = $('#coursesList');
        let courseRows: string = '';

        $.each(courseList, (index: number, course: App.models.ICourse) => {
            courseRows += `<tr>
                                   <td>${course.CourseId}</td>
                                   <td>${course.CourseName}</td>
                                   <td>${course.Author.FirstName}&nbsp;${course.Author.LastName}</td>
                                   <td>${index}</td>
                          </tr>`;
        });

        coursesList.html(courseRows);
    };

    const getFilteredCourses = (filter: string) => {
        if (filter) {
            return courses.filter(course => {
                return course.CourseId.toString().indexOf(filter) > -1
                    || course.CourseName.toString().toLocaleLowerCase().indexOf(filter.toString().toLocaleLowerCase()) > -1
                    || course.Author.FirstName.toString().toLocaleLowerCase().indexOf(filter.toString().toLocaleLowerCase()) > -1
                    || course.Author.LastName.toString().toLocaleLowerCase().indexOf(filter.toString().toLocaleLowerCase()) > -1;
            });
        }

        return courses;
    };

    const filterCourses = (filter: string) => {
        const _courses = getFilteredCourses(filter);
        displayCourses(_courses);
    };

    $('#filterCourses').keyup((event) => {
        event.preventDefault();
        const value: string = $('#filterCourses').val();
        filterCourses(value);
    });

    init();
});