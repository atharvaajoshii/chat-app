import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/Sidebar/Sidebar";

const Home = () => {
    return (
        <div className='flex sm:h-[450px] md:h-[550px] rounded-2xl overflow-hiddenbg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/30'>
            <Sidebar />
            <MessageContainer />
        </div>
    );
};
export default Home; 