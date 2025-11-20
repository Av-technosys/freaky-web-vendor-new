import { useNavigate } from "react-router-dom";
import freekychimp from "../../assets/freakychimplogo.png";
import companyLogo from "../../assets/testingProfilePicture.jpg"
import { Button, Card, CardContent, Input } from "../../components/ui";

const SelectCompany = () => {
    const navigate=useNavigate();
    const companyList=[
        {
            name:"Av technosys",
            member:"1 member",
            status:"Last logged in over 6 months ago",
            image:companyLogo
        },
        {
            name:"Av technosys",
            member:"1 member",
            status:"Last logged in over 6 months ago",
            image:companyLogo
        },
        {
            name:"Av technosys",
            member:"1 member",
            status:"Last logged in over 6 months ago",
            image:companyLogo
        },
    ]
    return (
        <>
           <div className=" h-screen w-screen">
            <div className="max-w-6xl h-full bg-white  mx-auto flex items-center justify-center">
            <div className="w-full h-full grid grid-cols-3 gap-5">
             <div className="col-span-2 p-3">
                <div className="w-full h-full p-3 border border-gray-200 rounded-md">
                    <h1 className="text-3xl text-center text-gray-600 font-bold">Your Teammates are on Apollo</h1>
                    <p className="text-gray-500 text-center">Join an existing team to get instant access to shared leades,insights and outomated outreact workflows</p>
                    <div className="flex gap-2 my-3">
                        <Input name="firstName" id="firstName" type="text" placeholder="Enter Your Company" required />
                        <Button >Search</Button>
                    </div>
                    {
                        companyList.map(
                            (company,index)=>{
                                return <Card className="mb-2" key={index}>
                                    <CardContent>
                                        <div className=" flex gap-2  items-center justify-between">
                                           <div className="flex gap-2">
                                             <div className="w-10 h-10 rounded-md">
                                            <img className="object-cover" src={company.image} alt="companyImage" />
                                            </div>
                                            <div>
                                                <p>{company.name}</p>
                                                <p>{company.status}</p>
                                            </div>
                                           </div>
                                            <Button>join</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            }
                        )
                    }
                        <Button onClick={()=> navigate("/create-company")} className="my-5" > + Create a new Company</Button>
                </div>
             </div>
             <div className="col-span-1 w-full  p-3 ">
                <div className="w-full p-2 h-full border border-gray-200 rounded-md flex items-center justify-center">
                    <div className="w-80 h-32">
                    <img className="w-full h-full " src={freekychimp} alt="freekychimp image" />
                </div>
                </div>
             </div>
            </div>
            </div>
           </div>
        </>
    );
}

export default SelectCompany;
