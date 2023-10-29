
const Banner = () => {
    return (
        <div className="bg-primary">
            <div className="px-5 md:px-48  flex flex-col-reverse md:flex-row md:gap-48 justify-center text-white py-4 md:py-24">
                <div>
                    <h2 className="text-2xl lg:text-5xl py-1 md:py-2">Best EDUCATIONAL Consultation<br/> CENTER FROM BANGLADESH</h2>
                    <p className="mt-3 text-md">
                        Lorem Ipsum is simply dummy text they are printing typesetting <br /> has been the industry standard.
                    </p>
                    <button className="text-sm font-bold px-7 py-4 rounded-xl bg-secondary text-white my-3">All Service</button>
                </div>
                <div className="flex justify-center items-center">
                    <img className="w-[100%] " src="https://i.ibb.co/3173Vgy/image-1.png" />
                </div>
            </div>

        </div>
    );
};

export default Banner;