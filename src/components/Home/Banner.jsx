
const Banner = () => {
    return (
        <section className="bg-primary p-2 lg:p-6 text-white">
            <div className="container mx-auto">
                <div className="flex flex-col-reverse lg:flex-row lg:justify-between items-center lg:gap-x-20">
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-2xl md:text-4xl lg:text-5xl text-justify font-semibold ">Edu-Care Solution, Your Best Learning Partner. Our Service your solution</h2>
                        <p className="my-3 text-md">
                            Innovative Educational Solutions Tailored for Success. Transformative Learning Experiences That Inspire. Partnering for Academic Excellence and Personal Growth. Your Bridge to a Brighter Tomorrow. Unlocking Potential, One Student at a Time.
                        </p>
                        <button className="btn-primary">All Service</button>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <img className="w-full rounded" src="https://i.ibb.co/3173Vgy/image-1.png" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;