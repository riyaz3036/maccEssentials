import Image from 'next/image';
import React from "react";
import mail from '../../../public/assets/mail.png';
import Insta from '../../../public/assets/Insta.png';
import Facebook from '../../../public/assets/Facebook.png';
import LinkedIn from '../../../public/assets/LinkedIn.png';
import Twitter from '../../../public/assets/Twitter.png';


const Footer=()=>{
    return(
        <footer>
            <div className="flex flex-wrap lg:flex-nowrap justify-center">
                <div className="flex items-center justify-between px-5">
                    <div className="text-2xl lg:text-4xl text-center italic mx-3 lg:mx-16">
                        <p style={{color: '#E2342D'}}>Macc</p>
                        <p style={{color: '#004197'}}>Essentials</p>
                    </div>
                    <div className="flex flex-col gap-5 mx-3 lg:mx-16">
                        <p className="text-sm lg:text-lg cursor-pointer">Home</p>
                        <p className="text-sm lg:text-lg cursor-pointer">Collection</p>
                        <p className="text-sm lg:text-lg cursor-pointer">Products</p>                    
                    </div>
                    <div className="flex flex-col gap-5 mx-3 lg:mx-16">
                        <p className="text-sm lg:text-lg cursor-pointer">About</p>
                        <p className="text-sm lg:text-lg cursor-pointer">Contact</p>
                        <p className="text-sm lg:text-lg cursor-pointer">FAQ</p>                      
                    </div>
                </div>

                <div className="p-10 max-w-[500px]">
                    <p className="text-sm lg:text-lg mb-5">Be the first to know about our biggest and best sales. We'll never send more than one email a month.</p>
                    <div className="mb-4 py-3 flex items-center" style={{borderBottom: '1px solid black'}}>
                        <input
                        type="email"
                        placeholder="ENTER YOUR EMAIL"
                        className="px-4 py-2 w-full placeholder-black focus:outline-none"
                        />
                        <div className="cursor-pointer"><Image src={mail} alt="mail" width={27} /></div>
                    </div>
                    <div className="flex gap-3">
                        <div className="cursor-pointer"><Image src={Twitter} alt="Twitter" width={38} height={38} /></div>
                        <div className="cursor-pointer"><Image src={LinkedIn} alt="LinkedIn" width={38} height={38} /></div>
                        <div className="cursor-pointer"><Image src={Facebook} alt="Facebook" width={38} height={38} /></div>
                        <div className="cursor-pointer"><Image src={Insta} alt="Insta" width={38} height={38} /></div>
                    </div>
                </div>
            </div>

            <div>
                <p className="text-center text-sm lg:text-lg">all rights are reserved</p>
            </div>
        </footer>
    )
}

export default Footer;