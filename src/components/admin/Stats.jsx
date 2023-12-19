/* eslint-disable react/prop-types */


const Stats = ({ data }) => {
    console.log(data);
    console.log(data.noOfCourse);
    return (
        <section className="mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="">User : {data.noOfUsers}</div>
                <div>Teacher : {data.noOfTeacher}</div>
                <div>Students : {data.noOfStudent}</div>
                <div>Courses : {data.noOfCourse}</div>
                <div>Blogs : {data.noOfBlogs}</div>
                <div>Sessions : {data.noOfSessions}</div>

            </div>
        </section >
    );
};

export default Stats;