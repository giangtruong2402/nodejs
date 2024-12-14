import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { creatSlug } from '../../ultils/helpers';
import { FaTablet, FaMobileAlt, FaLaptop, FaPlug, FaPrint, FaTv, FaCamera, FaChevronRight } from 'react-icons/fa'; // Import icon mũi tên
import { CiSpeaker } from 'react-icons/ci';

const Sidebar = () => {
    const { categories } = useSelector(state => state.app);

    // Hàm trả về icon tương ứng với từng danh mục
    const getIcon = (url) => {
        switch (url) {
            case 'Tablet': return <FaTablet className="inline-block mr-2" />;
            case 'dien-thoai': return <FaMobileAlt className="inline-block mr-2" />;
            case 'Speaker': return <CiSpeaker className="inline-block mr-2" />;
            case 'Laptop': return <FaLaptop className="inline-block mr-2" />;
            case 'Accessories': return <FaPlug className="inline-block mr-2" />;
            case 'Printer': return <FaPrint className="inline-block mr-2" />;
            case 'Television': return <FaTv className="inline-block mr-2" />;
            case 'Camera': return <FaCamera className="inline-block mr-2" />;
            default: return null;
        }
    };
    
    return (
        <div className='flex h-[400px] flex-col border bg-gray-100 rounded-lg shadow-lg p-4 shadow-md'>
            {categories?.map(el => (
                <NavLink
                    key={el.url}
                    to={el.url}
                    className={({ isActive }) => 
                        isActive 
                            ? 'border-b border-gray-300 bg-main text-white flex items-center justify-between px-5 pt-[13px] pb-[12px] text-sm hover:bg-main-light hover:text-white transition duration-200 rounded-lg'
                            : 'border-b border-gray-300 flex items-center justify-between px-5 pt-[12px] pb-[13px] text-sm hover:bg-gray-200 hover:text-main transition duration-200 rounded-lg'
                    }
                >
                    <div className='flex items-center'>
                        {getIcon(el.url)}
                        {el.title}
                    </div>
                    <FaChevronRight className="ml-3 text-gray-500" /> {/* Icon mũi tên */}
                </NavLink>
            ))}
        </div>
    );
};

export default Sidebar;
