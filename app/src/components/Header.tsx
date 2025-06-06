import Image from 'next/image';

function Header(){
    return(
        <header className="bg-red-600 shadow-lg">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                     <Image
                        src="/images/logo.png"
                        alt="Picture of the author"
                        width={500}
                        height={500}
                    />

                </div>

            </div>

        </header>
    );
}

export default Header;