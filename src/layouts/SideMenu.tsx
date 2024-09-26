
const NavLi = ({href,label,currentItem}:{href:string;label:string;currentItem:string}) =>
<li>
    <a
        href={href}
        className={`block rounded-lg  px-4 py-2 text-sm font-medium ${currentItem == label ? 'bg-gray-300 text-blue-600' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
    >
        {label}
    </a>
</li>


const SideMenu = ({currentItem}:{currentItem:string}) => {
    return (
        <div className="flex h-screen flex-col justify-between border-e bg-white">
            <div className="px-4 py-6">
                <ul className="mt-6 space-y-1">
                    <NavLi href="/" label="检查" currentItem={currentItem} />
                    <NavLi href="/Membr" label="人员" currentItem={currentItem} />
                    <NavLi href="#" label="部门" currentItem={currentItem} />
                </ul>
            </div>
            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                    <div>
                        <p className="text-xs">
                            <strong className="block font-medium">https://oldyang.site</strong>

                            <span> 信天翁信息管理系统 </span>
                        </p>
                    </div>
                </a>
            </div>
        </div>
    )
}
export default SideMenu;