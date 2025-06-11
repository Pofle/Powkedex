import Image from 'next/image';

function Header(){
    return(
        <header className="bg-red-600 shadow-lg">
            <div className="container mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Image
                        src="/images/logo.png"
                        alt="Pokedex logo"
                        width={500}
                        height={500}
                        className="max-w-[300px] h-auto mx-auto sm:mx-0"
                    />
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search Pokemon..."
                            className="w-full py-2 px-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-300 bg-red-50"
                        />
                        <button className="absolute right-2 top-2 text-gray-500">
                            <Image
                                src="/images/pokeball.png"
                                alt="Search icon in pokeball shape"
                                width={30}
                                height={30}
                                className="w-6 h-6 md:w-8 md:h-8"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;