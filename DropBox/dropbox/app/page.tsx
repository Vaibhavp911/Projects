import { Button } from '@/components/ui/button';
import { UserButton} from '@clerk/nextjs';
import { ClerkProvider } from "@clerk/nextjs";
import { Arrow } from '@radix-ui/react-dropdown-menu';
import { ArrowRight, ArrowRightLeft, Link, Link2 } from 'lucide-react';


export default function Home() {
  return (
    <main className="">
    <div className='flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800'>
      <div className='p-10 flex flex-col bg-[#2B2929]
      dark:bg-slate-800 text-white space-y-5'>
        <h1 className='text-5xl font-bold'>
          Welcome to DropBox <br/>
          <br />
          <h4 className='text-4xl font-bold'>Storing everything for you and your buisness needs.
          All in one place.</h4>
          </h1>
          <br />
          <p className='pb-20'>
            Enhance your personal storage with Dropbox, offering a simple and efficient way to upload,
            organize, and access files from anywhere. Securely store important documents and media,
            and experience the convenience of easy file management and sharing in one centralized solution.
          </p>

          <Link href="/dashboard"
            className="flex cursor-pointer bg-blue-500 px-8 py-4 w-fit" >
            <span className="mr-3">Try it for free!</span>
            <ArrowRight className="ml-10" />
          </Link>
          

      </div>

      <div className='bg-[#1E1919] dark:bg-slate-800 h-full p-10'>

      <video autoPlay loop muted className='rounded-lg'>
        <source 
        src="https://www.dropbox.com/scl/fi/7fdc3fjtze2eqrt2wjhj2/videoplayback.mp4?rlkey=u0ubem6u197wu3puk4plinqwl&st=8s5y6ag0&raw=1"
        typeof='video/mp4'
        />
        Your Browser does not support the video tag.
      </video>

      </div>
    </div>

    <p className='text-center font-bold text-xl pt-5'>Disclamer</p>
    <p className='text-center text-lg pt-2'>
      This is a demo page for Dropbox Page,
      made souly just for project purpose,and not for any commercial use.
      We do not own or affilate with Dropboc or/and any of its subsidiaries in any form. 
      Copyright Disclaimer: - Under section 107 of the copyright Act 1976, allowance is mad for FAIR USE for purpose such a as criticism,
      comment, news reporting, teaching, scholarship and research.
      Fair use is a use permitted by copyright statues that might otherwise be infringing.
      Non- Profit, educational or personal use tips the balance in favor of FAIR USE.
      </p>
      <Button />
    </main>
  );
}
