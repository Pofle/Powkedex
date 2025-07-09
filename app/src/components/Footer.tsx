import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer(){
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4 text-center">
                <div className="flex justify-center space-x-6 mb-4">
                    <a href="https://github.com/Pofle/Powkedex" className="text-gray-300 hover:text-white transition">
                        <FontAwesomeIcon icon={faGithub} className="text-xl text-gray-300 hover:text-white transition" />
                    </a>
                    <a href="https://www.linkedin.com/in/pauline-fleury-desirade/" className="text-gray-300 hover:text-white transition">
                        <FontAwesomeIcon icon={faLinkedin} className="text-xl text-gray-300 hover:text-white transition" />
                    </a>
                </div>
                <p class="text-gray-400">© 2023 PokéDex Project. Not affiliated with Nintendo or The Pokémon Company.</p>
            </div>
        </footer>

    );
}

export default Footer;