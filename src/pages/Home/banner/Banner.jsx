
const Banner = () => {
    return (
        <div className="text-white">
            <div className="mt-20 flex justify-between gap-44">
                <div>
                    <h2 className="text-5xl text-justify py-2">Best EDUCATIONAL</h2>
                    <h2 className="text-5xl text-justify py-2">Consultation CENTER </h2>
                    <h2 className="text-5xl text-justify py-2">FROM BANGLADESH</h2>
                    <p className="mt-3 text-sm">
                        Lorem Ipsum is simply dummy text they are printing typesetting <br /> has been the industry standard.
                    </p>
                </div>
                <div>
                    <img className="w-[500px] " src="https://i.ibb.co/3173Vgy/image-1.png"/>
                </div>
            </div>
            <button className="bg-[#F7A582] mb-20 py-4 px-8 font-bold rounded-xl">All Service</button>
        </div>
    );
};

export default Banner;