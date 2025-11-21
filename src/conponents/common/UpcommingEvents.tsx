import { Card } from "../../components/ui/card";


const events = [
  {
    id: 1,
    name: "Cynosure Festival",
    date: "24 March 2025",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnRzfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    name: "Nightor Festival",
    date: "30 March 2025",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnRzfGVufDB8fDB8fHww",
  },
  {
    id: 3,
    name: "Cyndrex Festival",
    date: "03 April 2025",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnRzfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    name: "Hyper Festival",
    date: "10 April 2025",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnRzfGVufDB8fDB8fHww",
  },
  {
    id: 5,
    name: "EDM Festival",
    date: "15 April 2025",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnRzfGVufDB8fDB8fHww",
  },
];

// Duplicate for demo (like screenshot)
const dummyEvents = [...events, ...events, ...events];

export default function EventList() {
  return (
    <div className="w-full max-sm:mt-4 md:max-w-sm bg-white rounded-3xl border p-4 shadow-lg mx-auto h-full overflow-y-auto">
      <div className="flex justify-between gap-1 items-baseline ">
        <div className="font-poppins font-semibold text-[16px] leading-none capitalize px-3 py-1.5 rounded mb-4">
          Upcoming Events
        </div>
        <div className="font-poppins font-medium text-[16px] leading-none underline text-[#FFC107] cursor-pointer mb-4">
          See All
        </div>

      </div>
      <div className="space-y-4">

        {dummyEvents.map((ev) => (
          <Card key={ev.id} className=" md:w-[240px] h-[56px] bg-[#F7F7F7] border border-[#6366F11A] rounded-[10px]  flex flex-row items-center  gap-[10px]  p-[8px_10px] shadow-none ">
            {/* Image */}

            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={ev.image}
                alt={ev.name}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-1 leading-none">
              <p className="text-[13px] font-medium text-gray-800">
                Event : {ev.name}
              </p>
              <p className="text-[11px] text-gray-500">
                Date : {ev.date}
              </p>
            </div>
          </Card>
        ))}


      </div>
    </div>
  );
}
